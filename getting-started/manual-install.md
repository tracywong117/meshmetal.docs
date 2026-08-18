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
g++ -O3 -march=native -fopenmp index_binary_hash_mmap.cpp -o index_mmap
g++ -O3 -march=native -fopenmp faiss_server.cpp -o faiss_server -lpthread
sudo cp index_mmap faiss_server /usr/local/bin/
```

### D. Standalone Index Tools (`build_index`)
```bash
cd build_index
make
sudo make install # optional
```
