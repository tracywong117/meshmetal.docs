# Running Queries

The `query_seq.py` script queries input FASTA sequence files against the database indices.

## Usage Script (`demo/query.sh`)

```bash
#!/bin/bash

python3 encoding/query_seq.py \
    server \
    DML/models/mgdb_model.pt \
    query_input.fasta \
    query_output_dir \
    5 \
    --device cpu \
    --use_faiss_server \
    --faiss_server_host localhost \
    --faiss_server_port 8002 \
    --api_port 8001 \
    --stage_1_topn 1000 \
    --topn 100 \
    --batch_size 2048 \
    --hamming_thres 28 \
    --cosine_thres 0.36 \
    --use_minhash_sampling \
    --window_size 75 \
    --window_stride 1 \
    --min_coverage 0.0
```

## Command Line Arguments Reference

### Positional Arguments
1. **`index_path`**: Path to local `.faiss` index file, or `server` if using `--use_faiss_server`.
2. **`model_path`**: Path to PyTorch model weights (`.pt`).
3. **`fasta_path`**: Path to input query `.fasta` sequence file.
4. **`output_dir`**: Directory to save query result files.
5. **`nflip`**: Number of bit flips for FAISS bucket enumeration (default: `5`).

### Key Optional Flags

| Flag | Default | Description |
|---|---|---|
| `--device` | `0` | GPU device ID (`0`) or `cpu` for CPU mode |
| `--use_faiss_server` | off | Connect to HTTP FAISS server instead of loading index locally |
| `--faiss_server_host` | `localhost` | Host address of FAISS server |
| `--faiss_server_port` | `5000` | Port of FAISS server |
| `--api_port` | `8001` | Port of BRWT annotation server |
| `--stage_1_topn` | `1000` | Number of candidate hashes retrieved in Stage 1 |
| `--topn` | `100` | Final top-N accession IDs returned after Stage 2 |
| `--hamming_thres` | `28` | Maximum Hamming distance threshold |
| `--cosine_thres` | `0.36` | Maximum Cosine distance threshold |
| `--min_coverage` | `0.0` | Minimum sequence coverage to report a hit |
