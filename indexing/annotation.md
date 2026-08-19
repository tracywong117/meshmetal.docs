# Step 4: Matrix Annotation Vectors

Once the deduplicated hash universe (`combined.bin`) is created, we build one sparse bit vector (`sd_vector`) for each sample using `parallel_sd_vector_annotation_128`.

Each bit in a sample's `sd_vector` indicates whether the $i$-th hash of the global universe appears in that sample.

## Usage

```bash
parallel_sd_vector_annotation_128 \
    <embedding_file_list.txt> \
    <combined.bin> \
    <embedding_dir> \
    <annotation_prefix> \
    <output_annotation_dir>
```

## Parameters

| Argument | Description |
|---|---|
| `<embedding_file_list.txt>` | File listing sample embedding filenames |
| `<combined.bin>` | Path to the deduplicated universe binary file |
| `<embedding_dir>` | Directory containing sample `*_embedding.bin` files |
| `<annotation_prefix>` | Prefix for generated annotation files (e.g. `""` or `_`) |
| `<output_annotation_dir>` | Directory to store output `.bin` annotation vectors |

## Output Format

Outputs SDSL `sd_vector` files named `<output_annotation_dir>/<prefix><sample_name>.bin`.

> [!IMPORTANT]
> Always compile `parallel_sd_vector_annotation_128` against the same `sdsl-lite` headers and library installed from `BRWT/construct_BRWT/external-libraries/sdsl-lite`.
