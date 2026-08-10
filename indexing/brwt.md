# Step 5: BRWT Construction & Relaxation

The Binary Relation Wavelet Tree (BRWT) compresses the sparse sample-to-hash matrix into a hierarchical bit-tree structure supporting fast column label queries for matching row IDs.

## 1. Constructing the BRWT Tree

```bash
construct_BRWT build \
    <annotation_dir> \
    <prefix> \
    <output_brwt_file> \
    [tmp_dir] \
    [--file_list <file_list.txt>] \
    [--threads <num_threads>] \
    [--linkage_k <k>] \
    [--linkage_seed <seed>] \
    [--linkage_trivial]
```

### Parameters

| Argument | Description |
|---|---|
| `<annotation_dir>` | Directory containing `.bin` SDSL `sd_vector` annotation files |
| `<prefix>` | Prefix matching files to process (e.g. `_` or `sra_`) |
| `<output_brwt_file>` | Target path for the generated BRWT file (e.g. `dataset_BRWT.brwt`) |
| `--file_list` | File listing specific annotation files to include |
| `--threads` | Number of parallel threads to use during construction |
| `--linkage_trivial` | Use trivial linear linkage instead of hierarchical clustering |

The construction step produces two primary files:
- `dataset_BRWT.brwt`: The compressed BRWT tree file.
- `dataset_BRWT.columns`: Text file listing column label names matching matrix indices.

## 2. Relaxing the BRWT Tree

Relaxation reduces tree depth and overall file size by allowing internal nodes to have lower arity.

```bash
construct_BRWT relax \
    <input_brwt_file> \
    <max_arity> \
    <output_relaxed_brwt_file>
```

### Example
```bash
construct_BRWT relax dataset_BRWT.brwt 2 dataset_BRWT_relaxed.brwt
```
