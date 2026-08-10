# Frequently Asked Questions (FAQ)

## General & Installation

### Q: Why do I get a Segmentation Fault when running `parallel_sd_vector_annotation_128`?
**A**: This is caused by a C++ ABI layout mismatch in SDSL-lite. The class `sd_vector_builder` has its constructor inside `libsdsl.so`, while `builder.set(i)` is compiled inline into your program. If `libsdsl.so` and your binary are compiled with different macros or optimization flags, memory member offsets mismatch.

**Solution**: Ensure you compile `parallel_sd_vector_annotation_128.cpp` using the exact same SDSL-lite headers and library installed from `BRWT/construct_BRWT/external-libraries/sdsl-lite`.

---

### Q: Can I run inference / encoding on CPU without GPUs?
**A**: Yes! Pass `--gpu_ids -1` to `gpus_inference_zstd.py` and `--device cpu` to `query_seq.py`.

---

### Q: What is the difference between `parallel_combine_sets_128_v2_log` and `parallel_combine_sets_128_v2_log_lowmem`?
**A**: 
- `v2_log` loads **all** embedding files into RAM at once. Use it only when dataset size fits within physical memory.
- `v2_log_lowmem` breaks input files into memory-budgeted chunks (e.g. `--chunk-gb 64`), sorts each chunk, spills to temporary disk files, and performs a k-way stream merge. Use this for large or petabase-scale datasets.

---

### Q: Do I need Python `faiss` installed to run query servers?
**A**: No. Meshmetal uses a standalone C++ binary index (`index_mmap.bin`) and HTTP REST server (`faiss_server.bin`). The Python client `faiss_client.py` communicates with `faiss_server.bin` over HTTP REST using standard `requests`.

---

### Q: How do I adjust query search sensitivity vs speed?
**A**:
- **`nflip`**: Controls how many bit flips are evaluated during 16-bit prefix bucket probing. Higher values (e.g. `5` or `6`) increase candidate coverage but take longer to search.
- **`hamming_thres`**: Maximum Hamming distance cutoff for candidates (default `28`).
- **`min_coverage`**: Minimum sequence coverage required to report a matching accession (e.g. `0.2` for 20% coverage).
