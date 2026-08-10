# BRWT Core Technical Reference

The Binary Relation Wavelet Tree (BRWT) implementation in `BRWT/` is a custom, optimized derivative of [Metagraph](https://github.com/ratschlab/metagraph).

## Key Innovations & Modifications

1. **Subtree Merging (`update` & `concat`)**: Enables incremental database expansion by merging existing BRWT trees with new annotation batches.
2. **Execution Resuming**: Skips previously built subtrees if construction is interrupted.
3. **Metagenomic Scale Performance**: Optimized arity relaxation algorithms (`relax`) to shrink tree depth and storage.
4. **HTTP Server Integration**: Built-in lightweight C++ REST API server (`Simple-Web-Server`) to handle HTTP query requests.

## Command Reference

```bash
# Build BRWT from sd_vector directory
construct_BRWT build <annotationDir> <prefix> <outputFile> [tmpDir] [--file_list <list>] [--threads <N>]

# Query BRWT directly for row IDs
construct_BRWT query <brwt_file> <columns_file> <row_ids>

# Relax BRWT arity to compress tree size
construct_BRWT relax <brwt_file> <max_arity> <output_file>

# Host HTTP REST API server
construct_BRWT serve <brwt_file> <columns_file> <port>

# Merge / Concatenate two BRWT trees
construct_BRWT update <old_brwt> <new_brwt> <output_file>
construct_BRWT concat <brwt1> <brwt2> <output_file>
```

## Attribution & License

- Derived from **construct_BRWT** (Metagraph project).
- Distributed under GPLv3. See `BRWT/LICENSE` and `BRWT/COPYRIGHT`.
