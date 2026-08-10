# Step 3: Hash Combining & Deduplication

After all samples are encoded into per-sample binary embedding files, they must be combined into a single sorted, deduplicated global "hash universe" (`combined.bin`).

Two C++ tools are provided in `build_index/`:

1. **`parallel_combine_sets_128_v2_log`**: In-RAM sorter (fastest, requires enough RAM to hold all embeddings at once).
2. **`parallel_combine_sets_128_v2_log_lowmem`**: Memory-efficient sorter (uses k-way merge disk spilling for large datasets).

## Low-Memory Combination (Recommended for Large Datasets)

```bash
parallel_combine_sets_128_v2_log_lowmem.bin \
    <embedding_file_list.txt> \
    <embedding_dir> \
    <output_combined.bin> \
    [--chunk-gb 64] \
    [--tmp-dir <tmp_dir>]
```

### Parameters

| Option | Default | Description |
|---|---|---|
| `<embedding_file_list.txt>` | *Required* | File listing sample embedding filenames (one per line) |
| `<embedding_dir>` | *Required* | Directory containing sample `*_embedding.bin` files |
| `<output_combined.bin>` | *Required* | Path to write the output combined unique hash universe file |
| `--chunk-gb N` | `64` | RAM limit in GiB for each sorting chunk before spilling to disk |
| `--tmp-dir DIR` | Output directory | Directory for temporary spill files |

## In-RAM Combination (For Small Datasets / Demos)

```bash
parallel_combine_sets_128_v2_log.bin \
    <embedding_file_list.txt> \
    <embedding_dir> \
    <output_combined.bin>
```

## How It Works

1. **Pass 1 (Chunk Sorting)**: Sequentially reads embedding files, sorts chunks in memory using `__gnu_parallel::sort`, removes duplicates within the chunk, and writes temporary run files to disk when peak RAM exceeds `--chunk-gb`.
2. **Pass 2 (K-Way Merge)**: Performs a k-way stream merge across all sorted run files, eliminating remaining cross-file duplicate 128-bit hashes.
3. **Output**: Writes a strictly sorted, unique binary file of 16-byte `Record128` values.
