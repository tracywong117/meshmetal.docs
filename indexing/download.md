# Step 1: S3 Contig Download

The `download_logan.py` script downloads compressed contigs/unitigs from the Logan S3 bucket for a specified list of SRA run accession IDs.

## Usage

```bash
python3 encoding/download_logan.py \
    --accession_list <accession_list.txt> \
    --output_dir <output_dir> \
    [--missing_output <missing_list.txt>] \
    [--threads <num_threads>]
```

## Parameters

| Parameter | Type | Default | Description |
|---|---|---|---|
| `--accession_list` | Path | *Required* | Path to text file containing SRA accession IDs (one per line, e.g. `ERR840666`) |
| `--output_dir` | Path | *Required* | Directory where downloaded `.zst` files will be saved |
| `--missing_output` | Path | `missing.txt` | File to log accession IDs that failed to download or were not found |
| `--threads` | Int | `8` | Number of parallel download threads |

## Accession ID Normalization

> **Note**: Logan S3 bucket files are indexed by bare SRA accession IDs (e.g. `ERR840666`). If your input file contains suffixes like `.contigs` or `.unitigs` (e.g. `ERR840666.contigs.fa`), strip the suffix before passing it to `download_logan.py`.

```bash
# Example: strip suffixes into a clean accession list
sed 's/\.contigs.*//g; s/\.unitigs.*//g; s/\.fa.*//g' accessions_raw.txt > accessions_clean.txt
```
