<!-- ---
layout: home

hero:
  name: "Meshmetal"
  text: "Deep Metric Learning for Petabase-Scale Sequence Similarity Search"
  tagline: A storage-efficient, highly scalable sequence similarity search system encoding genomic sequences into similarity-preserving 128-bit binary hash codes.
  actions:
    - theme: brand
      text: Get Started
      link: /getting-started/
    - theme: alt
      text: Architecture
      link: /architecture
    - theme: alt
      text: GitHub
      link: https://github.com/ytye2010/Meshmetal

features:
  - title: High Retrieval Accuracy
    details: Achieves over 50% higher retrieval accuracy than competing methods for homologous sequence queries using deep metric learning (DML).
  - title: Storage-Efficient Compression
    details: Leverages Binary Relation Wavelet Trees (BRWT) and 128-bit binary hash codes to compress petabase-scale metagenomic data into lightweight indices.
  - title: Scalable & Incremental
    details: Dynamically update database indices with new metagenomic datasets without requiring full index reconstruction.
  - title: Memory-Mapped FAISS
    details: Features a standalone, high-performance 128-bit binary hash index supporting memory-mapped (mmap) disk search and low-memory parallel builds.
--- -->

# Introduction

## Overview

Global metagenomic resources hold transformative potential for the life sciences, yet remain vastly underutilized because scalable and sensitive sequence similarity search remains challenging. Existing approaches rely largely on descriptive metadata or exact matching of short sequence fragments, limiting their ability to identify homologous sequences across datasets.

Meshmetal employs deep metric learning to encode genomic sequences into similarity-preserving binary hash codes, enabling efficient sequence comparison in Hamming space. Meshmetal indexed petabase-scale metagenomic data while supporting accurate, rapid and storage-efficient sequence similarity search. Importantly, the index architecture is highly scalable with new metagenomic datasets without requiring reconstruction. In benchmarks, Meshmetal achieved more than 50% higher retrieval accuracy than competing methods for homologous queries. Applications to identify HKU5-CoV virus and mobilized colistin resistance genes, recovering up to 3167% more related metagenomic datasets, further demonstrated its capacity of similarity search, thereby facilitating downstream biological discovery and surveillance.

## Key System Components

1. **`DML`**: Deep Metric Learning Transformer model training and architecture.
2. **`encoding`**: High-throughput GPU/CPU sequence download and embedding pipeline.
3. **`build_index`**: C++ tools for parallel hash deduplication, set combination, and sparse matrix annotation vector generation.
4. **`BRWT`**: Binary Relation Wavelet Tree for ultra-dense compression of sample-to-hash annotation matrices.
5. **`standalone_faiss`**: Custom C++ 128-bit binary hash index supporting memory mapping (`mmap`) and REST API servers.
