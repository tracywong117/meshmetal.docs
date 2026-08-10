# Manual Installation

This guide details how to build and install all C++ and Python dependencies directly on a Linux system (without Docker).

## 1. System Requirements & System Packages

### Operating System
- Ubuntu 20.04 / 22.04 LTS (or equivalent Linux distribution)

### Required APT Packages
```bash
sudo apt-get update && sudo apt-get install -y \
    build-essential \
    cmake \
    zlib1g-dev \
    libboost-all-dev \
    autoconf \
    automake \
    libtool \
    libdeflate-dev \
    libssl-dev \
    curl \
    unzip \
    git \
    pkg-config \
    libomp-dev \
    wget \
    zstd \
    python3 \
    python3-pip \
    python3-dev
```

## 2. Installing SDSL-lite

To ensure full ABI compatibility across all tools, compile and install SDSL-lite directly from the repository's pinned submodule:

```bash
cd BRWT/construct_BRWT/external-libraries/sdsl-lite
./install.sh /usr/local
sudo ldconfig
```

> **Note on SDSL-lite ABI layout**: Always use the vendored `sdsl-lite` submodule in `BRWT/construct_BRWT/external-libraries/sdsl-lite`. Avoid installing unmatched versions from third-party repositories, as inline vector methods (`sd_vector_builder::set`) depend on exact member layout alignment.

## 3. Python Environment & Dependencies

Install PyTorch and required Python packages:

```bash
pip3 install --no-cache-dir \
    torch==2.6 \
    torchvision==0.21 \
    numpy==1.26.4 \
    Flask \
    pybind11 \
    tqdm \
    requests \
    --extra-index-url https://download.pytorch.org/whl/cpu
```

*(For GPU support, replace `https://download.pytorch.org/whl/cpu` with your CUDA version, e.g. `https://download.pytorch.org/whl/cu126`).*

## 4. Compiling C++ Components

### A. C++ Sequence Preprocessor Extension
```bash
cd encoding/c++_preprocessor
python3 setup.py install
```

### B. BRWT Executable (`construct_BRWT`)
```bash
cd BRWT
cmake -S construct_BRWT -B build -DCMAKE_POLICY_VERSION_MINIMUM=3.5
cmake --build build -j$(nproc)
sudo cp build/construct_BRWT /usr/local/bin/
sudo find build/ -name "*.so*" -exec cp -P {} /usr/local/lib/ \;
sudo ldconfig
```

### C. Standalone FAISS & HTTP Server
```bash
cd standalone_faiss
g++ -O3 -march=native -fopenmp index_binary_hash_mmap.cpp -o index_mmap.bin
g++ -O3 -march=native -fopenmp faiss_server.cpp -o faiss_server.bin -lpthread
sudo cp index_mmap.bin faiss_server.bin /usr/local/bin/
```

### D. Standalone Index Tools (`build_index`)
```bash
cd build_index
g++ -std=c++17 -O3 -DNDEBUG check_sd_vector_stats.cpp -o check_sd_vector_stats.bin -lsdsl -ldivsufsort -ldivsufsort64
g++ -std=c++17 -O3 -DNDEBUG load_one_sd_column.cpp -o load_one_sd_column.bin -lsdsl -ldivsufsort -ldivsufsort64
g++ -std=c++17 -O3 -DNDEBUG load_sd_column_query_rows.cpp -o load_sd_column_query_rows.bin -lsdsl -ldivsufsort -ldivsufsort64 -lpthread
g++ -std=c++17 -O3 -DNDEBUG parallel_sd_vector_annotation_128.cpp -o parallel_sd_vector_annotation_128.bin -lsdsl -ldivsufsort -ldivsufsort64 -lpthread
g++ -std=c++17 -O3 -DNDEBUG parallel_sd_vector_annotation_128_shadow_indexing.cpp -o parallel_sd_vector_annotation_128_shadow_indexing.bin -lsdsl -ldivsufsort -ldivsufsort64 -lpthread
g++ -std=c++17 -O3 -DNDEBUG check_annotation_vectors.cpp -o check_annotation_vectors.bin -lsdsl -ldivsufsort -ldivsufsort64 -lpthread
g++ -std=c++17 -O3 -DNDEBUG update_annotations.cpp -o update_annotations.bin -lsdsl -ldivsufsort -ldivsufsort64 -lpthread
g++ -std=c++17 -O3 -DNDEBUG spot_check_mapping.cpp -o spot_check_mapping.bin -lsdsl -ldivsufsort -ldivsufsort64
g++ -std=c++17 -O3 -DNDEBUG verify_mapping.cpp -o verify_mapping.bin -lsdsl -ldivsufsort -ldivsufsort64
g++ -std=c++17 -O3 -DNDEBUG verify_annotation.cpp -o verify_annotation.bin -lsdsl -ldivsufsort -ldivsufsort64
g++ -std=c++17 -O3 -DNDEBUG reverse_sd_vector_annotation_128.cpp -o reverse_sd_vector_annotation_128.bin -lsdsl -ldivsufsort -ldivsufsort64 -lpthread
g++ -std=c++17 -O3 -DNDEBUG compare_sd_columns.cpp -o compare_sd_columns.bin -lsdsl -ldivsufsort -ldivsufsort64
g++ -std=c++17 -O3 append_set_128.cpp -o append_set_128.bin
g++ -std=c++17 -O3 compare_embeddings_file.cpp -o compare_embeddings_file.bin
g++ -std=c++17 -O3 -DNDEBUG -fopenmp parallel_combine_sets_128_v2_log.cpp -o parallel_combine_sets_128_v2_log.bin
g++ -std=c++17 -O3 -DNDEBUG -fopenmp parallel_combine_sets_128_v2_log_lowmem.cpp -o parallel_combine_sets_128_v2_log_lowmem.bin
sudo cp *.bin /usr/local/bin/
```
