# Frequently Asked Questions (FAQ)

## Installation & Build Issues

### Q: Why do I get a Segmentation Fault when running `parallel_sd_vector_annotation_128`?
**A**: This is caused by a C++ ABI layout mismatch in SDSL-lite. The class `sd_vector_builder` has its constructor inside `libsdsl.so`, while `builder.set(i)` is compiled inline into your program. If `libsdsl.so` and your binary are compiled with different macros or optimization flags, memory member offsets mismatch.

**Solution**: Ensure you compile `parallel_sd_vector_annotation_128.cpp` using the exact same SDSL-lite headers and library installed from `BRWT/construct_BRWT/external-libraries/sdsl-lite`.


### Q: How do I fix `cudaErrorInvalidDevice` or SM target errors (e.g. "This program was not compiled for SM 86") when installing/running `mutate_align`?
**A**: This happens when `mutate_align` was compiled for a different CUDA SM compute architecture than your current GPU, or when `nvcc` cannot locate your active CUDA installation path.

**Solution**: Export `CUDA_HOME` and `TORCH_CUDA_ARCH_LIST` matching your target GPU architecture before building/installing `mutate_align`:
```bash
export CUDA_HOME=/usr/local/cuda-12.4 # Set to your path of the NVIDIA CUDA Toolkit
export TORCH_CUDA_ARCH_LIST="8.6" # Set to your target GPU architecture (e.g. 7.0 for V100, 8.0 for A100, 8.6 for RTX 3090/A6000)

python3 -m pip install DML/mutate_align/ --no-build-isolation
```


### Q: Why do I get `ImportError: libc10.so: cannot open shared object file` when importing `mutate_align`?
**A**: `mutate_align` is a C++/CUDA Python extension linked against PyTorch C++ runtime libraries (`libc10.so`). Dynamic symbol resolution requires PyTorch shared libraries to be loaded into runtime memory first.

**Solution**: Always `import torch` **before** importing `mutate_align` in Python code. This import order cannot be reversed:
```python
import torch
import mutate_align  # MUST be imported after torch
```


## Indexing & Performance

### Q: Can I run inference / encoding on CPU without GPUs?
**A**: Yes! Pass `--gpu_ids -1` to `gpus_inference_zstd.py` and `--device cpu` to `query_seq.py`.


### Q: What is the difference between `parallel_combine_sets_128_v2_log` and `parallel_combine_sets_128_v2_log_lowmem`?
**A**: 
- `v2_log` loads **all** embedding files into RAM at once. Use it only when dataset size fits within physical memory.
- `v2_log_lowmem` breaks input files into memory-budgeted chunks (e.g. `--chunk-gb 64`), sorts each chunk, spills to temporary disk files, and performs a k-way stream merge. Use this for large or petabase-scale datasets.


## Query Engine & Server Mode

### Q: Do I need Python `faiss` installed to run query servers?
**A**: No. Meshmetal uses a standalone C++ binary index (`index_mmap`) and HTTP REST server (`faiss_server`). The Python client `faiss_client.py` communicates with `faiss_server` over HTTP REST using standard `requests`.


### Q: How do I adjust query search sensitivity vs speed?
**A**:
- **`nflip`**: Controls how many bit flips are evaluated during 16-bit prefix bucket probing. Higher values (e.g. `5` or `6`) increase candidate coverage but take longer to search.
- **`hamming_thres`**: Maximum Hamming distance cutoff for candidates (default `28`).
- **`min_coverage`**: Minimum sequence coverage required to report a matching accession (e.g. `0.2` for 20% coverage).
