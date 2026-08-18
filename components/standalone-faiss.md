# Standalone FAISS Technical Reference

`standalone_faiss/` is a customized, self-contained C++ implementation of FAISS's `IndexBinaryHash` ([Facebook AI Similarity Search](https://github.com/facebookresearch/faiss)).

## Key Technical Modifications

1. **Memory Mapping (`mmap`) Support**: Enables searching multi-gigabyte or terabyte binary indices directly from disk without loading the entire index into RAM.
2. **Variable Bit Dimensions**: Redesigned binary record structure (`Record128`) supporting arbitrary vector lengths instead of fixed 64-bit bounds.
3. **Dynamic ID Byte-Packing**: IDs are packed into minimal byte widths ($3$ to $8$ bytes) to save space depending on dataset size.
4. **Low-Memory Disk-Spill Parallel Build**: `build_low_mem` sorts chunks in parallel and uses k-way disk spilling to build indices exceeding physical RAM.
5. **Embedded REST API Server**: `faiss_server.cpp` provides a multi-threaded HTTP API for base64-encoded vector batch queries.

## Binary Index File Format

```
Offset       Size             Field
───────      ──────────────   ──────────────────────────────────────────
0            8 B              ntotal   (uint64) - total record count
8            8 B              id_bytes (uint64) - bytes per stored ID (3–8)
16           65536 x 8 B      bucket_offsets[] - byte offset of each bucket
+512 KB      65536 x 4 B      bucket_counts[]  - record count in each bucket
+768 KB      variable         bucket data (IDs + 16-byte codes)
```

## REST API Server Endpoints (`faiss_server`)

### `GET /health`
Returns status, mode (`ram` vs `mmap`), and record count.

### `POST /search` or `POST /batch_search`
**JSON Request Body**:
```json
{
  "queries": "<base64-encoded raw bytes of Record128 array>",
  "k": 100,
  "nflip": 5,
  "radius": 28
}
```

**JSON Response**:
```json
{
  "distances": "<base64 int32[nq x k]>",
  "indices": "<base64 int64[nq x k]>",
  "search_time": 0.012,
  "num_queries": 187
}
```
