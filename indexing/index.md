# Indexing Pipeline Overview

The Meshmetal indexing pipeline transforms raw sequence files (e.g. SRA contigs/unitigs) into compressed queryable index structures.

## Pipeline Steps Summary

| Step | Script / Binary | Description | Output |
|---|---|---|---|
| **1. Download** | `download_logan.py` | Fetch `.zst` contigs/unitigs from Logan S3 | `downloads/*.zst` |
| **2. Encode** | `gpus_inference_zstd.py` | Run DML Transformer model on GPU/CPU | `embeddings/*.bin` |
| **3. Combine & Dedup** | `parallel_combine_sets_128_v2_log_lowmem` | Merge per-sample binary hashes into universe | `combined.bin` |
| **4. Annotate** | `parallel_sd_vector_annotation_128` | Build sample bit vectors (`sd_vector`) | `annotations/*.bin` |
| **5. BRWT Build** | `construct_BRWT build & relax` | Construct and relax sparse matrix tree | `dataset_BRWT.brwt` |
| **6. FAISS Index** | `index_mmap build_low_mem` | Build 128-bit `IndexBinaryHash` index | `dataset.faiss` |
