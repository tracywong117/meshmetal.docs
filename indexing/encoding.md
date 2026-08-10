# Step 2: Sequence Encoding

The `gpus_inference_zstd.py` script reads downloaded `.zst` sequence files, parses contigs using PyBind11 C++ preprocessors, passes sequence windows through the trained Deep Metric Learning (DML) Transformer model, and outputs per-sample 128-bit binary embedding files.

## Usage

```bash
python3 encoding/gpus_inference_zstd.py \
    --size_list <file_size_list.txt> \
    --input_dir <input_dir> \
    --tmp_dir <tmp_dir> \
    --model_path DML/models/mgdb_model.pt \
    --output_dir <output_dir> \
    --gpu_ids 0,1,2,3 \
    [--window_size 90] \
    [--window_stride 3] \
    [--k 64] \
    [--batch_size 16384]
```

## Parameters

| Parameter | Default | Description |
|---|---|---|
| `--size_list` | *Required* | Path to text file listing input filenames |
| `--input_dir` | *Required* | Directory containing `.zst` sequence files |
| `--tmp_dir` | *Required* | Temporary directory for sequence decompression |
| `--model_path` | `models/Meshmetal.pt` | Path to pre-trained PyTorch model checkpoint |
| `--output_dir` | *Required* | Directory to save generated binary embedding files (`*_embedding.bin`) |
| `--gpu_ids` | `0` | Comma-separated GPU IDs (e.g. `0,1,2,3`), or `-1` for CPU-only mode |
| `--window_size` | `90` | Subsequence window size |
| `--window_stride` | `3` | Window stride step size |
| `--k` | `64` | MinHash k-mer sampling size |
| `--batch_size` | `16384` | Model inference batch size |

## CPU vs GPU Execution

- **GPU Mode**: Specify `--gpu_ids 0,1,2,3` to parallelize encoding across multiple GPUs.
- **CPU Mode**: Specify `--gpu_ids -1` to run inference on CPU.

## Output Binary Format

For each sample `SAMPLE.zst`, the encoder produces a `SAMPLE_embedding.bin` file consisting of flat 16-byte (128-bit) binary records:

```
[ uint64_t lo ][ uint64_t hi ]  <-- 128-bit hash 0 (16 bytes)
[ uint64_t lo ][ uint64_t hi ]  <-- 128-bit hash 1 (16 bytes)
...
```
