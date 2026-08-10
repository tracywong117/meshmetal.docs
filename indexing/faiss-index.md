# Step 6: Standalone FAISS Indexing

The unique 128-bit hash universe (`combined.bin`) is indexed into a custom standalone FAISS `IndexBinaryHash` structure using `index_mmap.bin`.

## Building the Index

For large datasets, use `build_low_mem` (two-pass disk spill build):

```bash
index_mmap.bin build_low_mem \
    <combined.bin> \
    <output.faiss> \
    [tmp_folder] \
    [--max-mem <RAM_GB>]
```

### Parameters

| Argument | Default | Description |
|---|---|---|
| `<combined.bin>` | *Required* | Input file containing deduplicated 128-bit hash codes |
| `<output.faiss>` | *Required* | Path to write the output `.faiss` binary index file |
| `[tmp_folder]` | Same dir as output | Directory for temporary spill files |
| `--max-mem GB` | `4` | RAM limit in GB for chunk processing |

### Full-RAM Build (For Small Datasets)

```bash
index_mmap.bin build <combined.bin> <output.faiss>
```

## How `IndexBinaryHash` Works

- **Hash partitioning**: The 128-bit hash is partitioned using a **16-bit prefix** (first 16 bits of the lower 64-bit int) into 65,536 buckets.
- **Bucket storage**: Each bucket stores packed record IDs and 128-bit codes.
- **Dynamic ID packing**: IDs are packed into minimal byte widths ($3$ to $8$ bytes) depending on total dataset size.
- **Hardware POPCNT**: Candidate comparisons use x86 hardware POPCNT instructions (`_mm_popcnt_u64`) for Hamming distance calculation.
