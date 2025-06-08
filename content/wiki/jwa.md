---
title: JWA
slug: "jwa"
---

RFC 7518은 "JSON Web Algorithms (JWA)"라는 제목을 가지는 RFC입니다.
이 문서는 JSON Web Token (JWT) 및 JSON Web Signature (JWS)와 같은 JSON 기반 보안 토큰에서 사용되는 알고리즘을 정의합니다.

### 1. **Introduction**

- **설명**: JSON Web Algorithms (JWA)은 JSON Web Signature (JWS), JSON Web Encryption (JWE)에서 사용되는 다양한 암호화 알고리즘과 서명 방법을 정의하는 표준입니다. 이 표준은 안전한 웹 애플리케이션과 API 통신을 위해 설계되었습니다.

### 2. **Terminology**

- **설명**: 이 섹션에서는 JWA에서 사용되는 주요 용어를 정의합니다. 예를 들어, `"alg"`는 암호화 알고리즘을 의미하고, `"enc"`는 암호화를 나타냅니다. 이러한 용어들은 JWS와 JWE의 구현에 있어 매우 중요합니다.

### 3. **Cryptographic Algorithms for Digital Signatures and MACs**

이 섹션은 JWS에서 데이터 무결성 및 출처 인증을 위해 사용되는 다양한 디지털 서명 및 MAC 알고리즘을 설명합니다.

#### 3.1. **"alg" (Algorithm) Header Parameter Values for JWS**

- **설명**: JWS에서 사용되는 서명 알고리즘을 정의합니다. 이 알고리즘들은 데이터가 송신된 이후 변경되지 않았음을 확인하고, 데이터가 신뢰할 수 있는 출처로부터 왔음을 보증합니다.

#### 3.2. **HMAC with SHA-2 Functions**

- **특징**: HMAC (Hash-based Message Authentication Code)와 SHA-2를 결합하여 데이터를 서명하고 무결성을 검증합니다.
- **주요 쓰임새**: JWT (JSON Web Token)에서 토큰의 무결성을 보장하기 위해 자주 사용됩니다. 이 알고리즘은 대칭 키를 사용하여 HMAC을 생성하므로, 서명과 검증에 동일한 키가 필요합니다.
- **알고리즘**:
  - **HS256**: HMAC + SHA-256
  - **HS384**: HMAC + SHA-384
  - **HS512**: HMAC + SHA-512

#### 3.3. **Digital Signature with RSASSA-PKCS1-v1_5**

- **특징**: RSA 알고리즘을 사용한 디지털 서명 방식으로, PKCS#1 v1.5 표준을 따릅니다. 이 방식은 비대칭 키를 사용하며, 공개 키로 서명을 검증하고 비공개 키로 서명을 생성합니다.
- **주요 쓰임새**: 중요한 메시지나 인증서의 서명에 사용됩니다. 예를 들어, SSL/TLS 인증서와 같은 보안 통신에서 널리 사용됩니다.
- **알고리즘**:
  - **RS256**: RSA + SHA-256
  - **RS384**: RSA + SHA-384
  - **RS512**: RSA + SHA-512

#### 3.4. **Digital Signature with ECDSA**

- **특징**: ECDSA (Elliptic Curve Digital Signature Algorithm)는 타원 곡선 기반의 서명 알고리즘으로, RSA보다 작은 키 크기로 동일한 보안을 제공합니다. 이는 특히 성능이 중요한 환경에서 유리합니다.
- **주요 쓰임새**: 주로 IoT 장치와 같이 리소스가 제한된 환경에서 사용됩니다.
- **알고리즘**:
  - **ES256**: ECDSA + P-256 + SHA-256
  - **ES384**: ECDSA + P-384 + SHA-384
  - **ES512**: ECDSA + P-521 + SHA-512

#### 3.5. **Digital Signature with RSASSA-PSS**

- **특징**: RSA-PSS는 기존 RSA 서명 방식보다 강화된 보안을 제공합니다. PSS (Probabilistic Signature Scheme) 패딩을 사용해 보안을 높였습니다.
- **주요 쓰임새**: 보안이 매우 중요한 데이터 서명에 사용됩니다.
- **알고리즘**:
  - **PS256**: RSA-PSS + SHA-256
  - **PS384**: RSA-PSS + SHA-384
  - **PS512**: RSA-PSS + SHA-512

#### 3.6. **Using the Algorithm "none"**

- **특징**: `"none"`은 서명 또는 암호화를 사용하지 않는 경우에 지정됩니다. 이 설정은 보안이 필요하지 않거나 테스트 용도로 사용됩니다.
- **주요 쓰임새**: 테스트나 비보안 환경에서 사용될 수 있습니다.

### 4. **Cryptographic Algorithms for Key Management**

이 섹션은 JWE에서 데이터를 안전하게 암호화하기 위해 사용하는 다양한 키 관리 알고리즘을 설명합니다.

#### 4.1. **"alg" (Algorithm) Header Parameter Values for JWE**

- **설명**: JWE에서 사용되는 키 관리 알고리즘을 정의합니다. 이 알고리즘들은 주로 데이터를 암호화하고 안전하게 전송하기 위해 사용됩니다.

#### 4.2. **Key Encryption with RSAES-PKCS1-v1_5**

- **특징**: RSAES-PKCS1-v1_5는 RSA 기반의 키 암호화 방식으로, PKCS#1 v1.5 패딩을 사용합니다. 이는 대칭 키를 안전하게 암호화하는 데 자주 사용됩니다.
- **주요 쓰임새**: 대칭 키의 안전한 암호화와 전송에 사용됩니다.

#### 4.3. **Key Encryption with RSAES OAEP**

- **특징**: OAEP (Optimal Asymmetric Encryption Padding)는 RSA 암호화의 보안을 강화하는 패딩 방식입니다. 이는 PKCS#1 v1.5에 비해 보안성이 향상되었습니다.
- **주요 쓰임새**: 키 암호화 및 전송에서 더욱 안전한 보호가 필요할 때 사용됩니다.

#### 4.4. **Key Wrapping with AES Key Wrap**

- **특징**: AES 키 랩 방식은 대칭 키를 안전하게 암호화(래핑)하는 방법입니다. 이는 AES 알고리즘을 기반으로 하며, 키를 보호하는 데 사용됩니다.
- **주요 쓰임새**: JWE에서 대칭 키를 안전하게 전송할 때 사용됩니다.

#### 4.5. **Direct Encryption with a Shared Symmetric Key**

- **특징**: 사전에 공유된 대칭 키를 사용하여 데이터를 암호화하는 방식입니다. 이 방식에서는 비대칭 키를 사용할 필요가 없습니다.
- **주요 쓰임새**: 양쪽에서 동일한 대칭 키를 이미 알고 있을 때 사용됩니다.

#### 4.6. **Key Agreement with Elliptic Curve Diffie-Hellman Ephemeral Static (ECDH-ES)**

- **특징**: ECDH-ES는 타원 곡선 디피-헬만 알고리즘을 사용하여 양측에서 동일한 대칭 키를 독립적으로 생성합니다. 이 방법은 키를 네트워크를 통해 직접 전송하지 않기 때문에 더욱 안전합니다.
- **주요 쓰임새**: 대칭 키를 네트워크를 통해 전송하지 않고 안전하게 공유할 때 사용됩니다.

#### 4.7. **Key Encryption with AES GCM**

- **특징**: AES GCM은 암호화와 동시에 데이터 무결성을 보장하는 인증 태그를 생성합니다. 이 알고리즘은 성능이 뛰어나며 보안성이 높습니다.
- **주요 쓰임새**: 고성능 및 보안이 필요한 데이터 암호화에 사용됩니다.

#### 4.8. **Key Encryption with PBES2**

- **특징**: PBES2는 비밀번호 기반의 키 파생 알고리즘으로, 비밀번호로부터 강력한 암호화 키를 생성합니다.
- **주요 쓰임새**: 사용자 비밀번호를 기반으로 데이터를 암호화할 때 사용됩니다.

### 5. **Cryptographic Algorithms for Content Encryption**

이 섹션은 JWE에서 데이터를 암호화하는 데 사용되는 콘텐츠 암호화 알고리즘을 설명합니다.

#### 5.1. **"enc" (Encryption Algorithm) Header Parameter Values for JWE**

- **설명**: JWE에서 콘텐츠를 암호화하기 위해 사용하는 알고리즘을 정의합니다.

#### 5.2. **AES_CBC_HMAC_SHA2 Algorithms**

- **특징**: AES의 CBC 모드와 HMAC-SHA2를 결합하여 데이터를 암호화하고 무결성을 검증합니다. 이 방식은 데이터의 기밀성과 무결성을 동시에 보장합니다.
- **주요 쓰임새**: 금융 거래, 개인 정보 보호 등 기밀성과 무결성을 동시에 요구하는 환경에서 많이 사용됩니다.
- **주요 쓰임새**: 데이터의 기밀성과 무결성을 동시에 보장해야 할 때 사용됩니다.
- **알고리즘**:
  - **AES_128_CBC_HMAC_SHA_256**: 128비트 키를 사용하는 AES-CBC + HMAC-SHA-256 알고리즘. AES는 데이터를 암호화하고, HMAC은 무결성을 보장합니다.
  - **AES_192_CBC_HMAC_SHA_384**: 192비트 키를 사용하는 AES-CBC + HMAC-SHA-384 알고리즘.
  - **AES_256_CBC_HMAC_SHA_512**: 256비트 키를 사용하는 AES-CBC + HMAC-SHA-512 알고리즘.

#### 5.3. **Content Encryption with AES GCM**

- **특징**: AES GCM (Galois/Counter Mode)은 고속 처리와 높은 보안을 제공하는 대칭 키 암호화 알고리즘으로, 인증 태그를 통해 데이터의 무결성도 보장합니다.
- **주요 쓰임새**: HTTPS, VPN, TLS/SSL과 같은 보안 프로토콜에서 데이터를 암호화할 때 널리 사용됩니다.

### 6. **Cryptographic Algorithms for Keys**

이 섹션에서는 JSON Web Keys (JWK)에서 사용되는 다양한 키 타입과 그 관련 파라미터를 설명합니다. 이 키들은 JWS, JWE 등에서 데이터를 암호화하고, 서명하며, 인증하는 데 필수적인 요소들입니다.

#### 6.1. **"kty" (Key Type) Parameter Values**

- **설명**: `"kty"`는 JSON Web Key에서 사용되는 키의 타입을 정의하는 파라미터입니다. 이 파라미터는 해당 키가 어떤 유형의 암호화 또는 서명 알고리즘에 사용될지를 결정합니다.
- **주요 키 타입**:
  - **RSA**: 공개 키 암호화 및 서명에 사용됩니다. 예를 들어, RS256 서명 알고리즘은 RSA를 기반으로 합니다.
  - <strong>EC (Elliptic Curve)</strong>: 타원 곡선 암호화 알고리즘에서 사용됩니다. 예를 들어, ES256 서명 알고리즘은 ECDSA를 기반으로 합니다.
  - **oct**: 대칭 키로 사용되는 키 타입입니다. 예를 들어, HS256 서명 알고리즘은 HMAC-SHA-256과 함께 사용됩니다.

#### 6.2. **Parameters for Elliptic Curve Keys**

- **특징**: 타원 곡선 키는 효율적인 키 크기로도 높은 보안을 제공하며, 특히 ECDSA와 ECDH와 같은 타원 곡선 기반 알고리즘에서 사용됩니다.
- **주요 파라미터**:
  - <strong>"crv" (Curve)</strong>: 타원 곡선의 이름을 지정합니다. 예: `P-256`, `P-384`, `P-521`.
  - <strong>"x" (X Coordinate)</strong>: 타원 곡선 공개 키의 X 좌표를 나타냅니다.
  - <strong>"y" (Y Coordinate)</strong>: 타원 곡선 공개 키의 Y 좌표를 나타냅니다.
  - <strong>"d" (ECC Private Key)</strong>: 타원 곡선 비공개 키를 나타내며, 이는 외부에 노출되지 않아야 합니다.

#### 6.3. **Parameters for RSA Keys**

- **특징**: RSA 키는 공개 키 암호화 및 서명에 사용됩니다. RSA 키는 큰 소수의 곱을 기반으로 하며, 보안성이 높지만, 타원 곡선 키에 비해 더 큰 키 크기를 필요로 합니다.
- **주요 파라미터**:
  - <strong>"n" (Modulus)</strong>: RSA 공개 키의 모듈러스 값으로, 키의 크기를 결정하는 중요한 요소입니다.
  - <strong>"e" (Exponent)</strong>: RSA 공개 키의 지수 값입니다.
  - <strong>"d" (Private Exponent)</strong>: RSA 비공개 키의 지수 값으로, 암호화된 데이터를 복호화하거나 서명을 생성하는 데 사용됩니다.
  - <strong>"p", "q"</strong>: RSA 알고리즘의 프라임 팩터입니다.
  - <strong>"dp", "dq", "qi"</strong>: 중국인의 나머지 정리를 활용한 최적화 값들입니다.

#### 6.4. **Parameters for Symmetric Keys**

- **특징**: 대칭 키는 암호화와 복호화에 동일한 키를 사용하는 방식입니다. 이는 성능이 빠르며, 주로 대량의 데이터를 암호화하는 데 사용됩니다.
- **주요 파라미터**:
  - <strong>"k" (Key Value)</strong>: 대칭 키의 실제 값을 나타내는 파라미터로, 보통 Base64 URL로 인코딩되어 저장 및 전송됩니다.

대칭 키는 AES와 같은 알고리즘에서 널리 사용되며, 데이터의 기밀성을 유지하는 데 중요한 역할을 합니다. 대칭 키는 반드시 안전하게 관리되어야 하며, 키의 노출은 전체 보안 시스템을 위험에 빠뜨릴 수 있습니다.

### 7. **IANA Considerations**

- **설명**: 이 섹션은 IANA(Internet Assigned Numbers Authority)가 JWA에 사용되는 알고리즘과 관련 파라미터의 등록을 관리하는 절차를 다룹니다. IANA는 인터넷 표준 및 프로토콜에서 사용되는 다양한 파라미터를 중앙에서 관리하는 역할을 합니다.
- **목적**: 새로운 알고리즘, 키 타입, 헤더 파라미터, 압축 알고리즘 등을 표준화된 형태로 등록하여, 전 세계적으로 통일된 방식으로 사용될 수 있도록 합니다.
- **주요 내용**:
  - **7.1. JSON Web Signature and Encryption Algorithms Registry**: JWS 및 JWE에서 사용되는 암호화 알고리즘을 등록합니다.
  - **7.2. Header Parameter Names Registration**: JWS 및 JWE에서 사용되는 헤더 파라미터 이름을 등록합니다.
  - **7.3. JSON Web Encryption Compression Algorithms Registry**: JWE에서 사용되는 압축 알고리즘을 등록합니다.
  - **7.4. JSON Web Key Types Registry**: JWK에서 사용되는 키 타입을 등록합니다.
  - **7.5. JSON Web Key Parameters Registration**: JWK에서 사용되는 키 파라미터를 등록합니다.
  - **7.6. JSON Web Key Elliptic Curve Registry**: 타원 곡선과 관련된 파라미터를 등록합니다.

### 8. **Security Considerations (보안 고려사항)**

- **설명**: 이 섹션은 JWA에서 사용하는 알고리즘과 기술을 구현할 때의 보안 관련 위험 요소와 주의사항을 설명합니다.
- **주요 내용**:
  - **알고리즘 선택**: 구현자는 알고리즘 선택 시 각 알고리즘의 보안 수준, 성능, 사용 사례를 신중하게 고려해야 합니다. 특히, 보안 수준이 낮거나 잘 알려진 취약점이 있는 알고리즘은 피해야 합니다.
  - **키 관리**: 암호화 키는 안전하게 생성, 저장, 배포되어야 합니다. 공개 키와 비공개 키의 관리 방법은 특히 중요하며, 비공개 키는 절대 유출되지 않도록 보호해야 합니다.
  - **패딩 공격**: RSAES-PKCS1-v1_5와 같은 패딩을 사용하는 알고리즘은 패딩 오라클 공격에 취약할 수 있습니다. 따라서, RSAES-OAEP와 같은 보안이 강화된 알고리즘을 사용하는 것이 권장됩니다.
  - **타원 곡선**: 타원 곡선을 사용할 때는 표준화된 곡선과 파라미터를 사용하는 것이 중요하며, 타원 곡선 암호화에서 비표준적인 곡선을 사용하는 것은 보안 리스크를 초래할 수 있습니다.
  - **HMAC**: HMAC 알고리즘은 올바르게 구현되면 강력한 인증 기능을 제공합니다. 그러나 키 관리가 취약하면 공격자가 HMAC 키를 도용하여 인증 우회를 시도할 수 있습니다.
  - **난수 생성**: 모든 암호화 작업에서 사용되는 난수는 암호학적으로 안전한 난수 생성기(CSPRNG)에서 생성되어야 하며, 예측 가능한 난수는 암호화 시스템 전체를 무력화시킬 수 있습니다.

## 주요 알고리즘 간단 요약

### 1\. HMAC \(Hash\-based Message Authentication Code\)

- **작동 원리**:
  1. **키와 메시지 준비**: 비밀 키와 메시지를 준비합니다.
  2. **키 패딩**: 비밀 키를 해시 함수의 블록 크기와 맞게 패딩합니다.
  3. **내부 해시 생성**: 비밀 키와 메시지를 해시 함수에 입력하여 내부 해시 값을 생성합니다.
  4. **외부 해시 생성**: 내부 해시 결과와 키를 결합하여 최종 HMAC 값을 생성합니다.
- **주로 사용되는 부분**:
  - **데이터 무결성**: 데이터가 전송 중 변조되지 않았는지 확인합니다.
  - **인증**: 메시지가 발신자에 의해 서명되었음을 확인합니다.
  - **비밀번호 해싱**: 사용자 비밀번호를 저장할 때 HMAC을 사용하여 해시를 생성합니다.

### 2\. RSA \(Rivest\-Shamir\-Adleman\)

- **작동 원리**:
  1. **키 생성**: 큰 소수 <span class="katex-mathml">pp</span><span class="mord mathnormal">p</span>와 <span class="katex-mathml">qq</span><span class="mord mathnormal">q</span>를 선택하고, <span class="katex-mathml">n=p×qn = p \\times q</span><span class="mord mathnormal">n</span><span class="mrel">=</span><span class="mord mathnormal">p</span><span class="mbin">×</span><span class="mord mathnormal">q</span>를 계산합니다. 공개 키는 <span class="katex-mathml">(n,e)(n, e)</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mpunct">,</span><span class="mord mathnormal">e</span><span class="mclose">)</span>, 개인 키는 <span class="katex-mathml">(n,d)(n, d)</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mpunct">,</span><span class="mord mathnormal">d</span><span class="mclose">)</span>로 설정합니다.
  2. **암호화**: 공개 키로 메시지를 암호화합니다.
  3. **복호화**: 개인 키로 암호문을 복호화합니다.
- **주로 사용되는 부분**:
  - **데이터 암호화**: 데이터의 기밀성을 보장하기 위해 공개 키 암호화 방식으로 사용됩니다.
  - **디지털 서명**: 서명 생성 및 검증에 사용되며, 문서의 무결성과 서명자를 확인합니다.
  - **키 교환**: 안전한 키 교환을 위해 사용됩니다.
- **향상된 버전**:
  - **RSA-OAEP (Optimal Asymmetric Encryption Padding)**
    - **특징**: 암호화에 패딩을 추가하여 보안을 강화합니다.
    - **장점**: 패딩 방식으로 암호화의 보안성을 높입니다.
  - **RSA-PSS (Probabilistic Signature Scheme)**
    - **특징**: RSA 서명에 랜덤 값을 사용하는 패딩 스킴입니다.
    - **장점**: 서명 생성 과정에서 보안성을 강화합니다.

### 3\. ECDSA \(Elliptic Curve Digital Signature Algorithm\)

- **작동 원리**:
  1. **키 생성**: 개인 비밀 키로 공개 키를 생성합니다.
  2. **서명 생성**: 메시지의 해시값을 서명하고 서명값을 생성합니다.
  3. **서명 검증**: 공개 키와 서명값으로 서명의 유효성을 검증합니다.
- **주로 사용되는 부분**:
  - **디지털 서명**: 데이터의 무결성과 출처를 확인하는 데 사용됩니다.
  - **인증서 서명**: SSL/TLS 인증서에 사용되어 웹사이트의 신뢰성을 보장합니다.

### 4\. EdDSA \(Edwards\-Curve Digital Signature Algorithm\)

- **작동 원리**:
  1. **키 생성**: 비밀 키를 사용하여 공개 키를 생성합니다.
  2. **서명 생성**: 메시지 해시값과 랜덤 값을 사용하여 서명값을 생성합니다.
  3. **서명 검증**: 공개 키와 서명값을 사용하여 서명의 유효성을 확인합니다.
- **주로 사용되는 부분**:
  - **디지털 서명**: 빠르고 안전한 서명 생성을 제공하며, 암호화된 메시지 전송에 사용됩니다.
  - **블록체인**: 암호화폐의 트랜잭션 서명에 사용됩니다.
- **향상된 버전**:
  - **EdDSA with Ed25519**
    - **특징**: Ed25519 타원 곡선을 사용하여 서명을 생성합니다.
    - **장점**: 높은 보안성과 성능을 제공하며, 현대적인 암호화 요구를 충족합니다.
  - **EdDSA with Ed448**
    - **특징**: Ed448 타원 곡선을 사용하여 서명을 생성합니다.
    - **장점**: 더 긴 키 길이로 강력한 보안성을 제공합니다.

### 5\. AES \(Advanced Encryption Standard\)

- **작동 원리**:
  1. **키 확장**: 입력 키를 여러 라운드 키로 확장합니다.
  2. **암호화**: 입력 블록을 암호화하여 기밀성을 보장합니다.
  3. **복호화**: 암호화된 데이터를 원래 상태로 복원합니다.
- **주로 사용되는 부분**:
  - **데이터 암호화**: 데이터의 기밀성을 보장하는 데 사용됩니다.
  - **VPN 및 보안 통신**: VPN과 같은 보안 통신 채널에서 데이터 암호화에 사용됩니다.
- **향상된 버전**:
  - **AES-GCM (Galois/Counter Mode)**
    - **특징**: 카운터 모드와 Galois 모드를 결합하여 암호화와 인증을 동시에 수행합니다.
    - **장점**: 데이터의 기밀성과 무결성을 동시에 보장합니다.
  - **AES-CCM (Counter with CBC-MAC)**
    - **특징**: 카운터 모드와 CBC-MAC을 결합하여 암호화와 인증을 수행합니다.
    - **장점**: 데이터의 기밀성과 인증을 동시에 제공하며, 무선 네트워크에서 사용됩니다.

### 6\. RSA\-OAEP \(Optimal Asymmetric Encryption Padding\)

- **작동 원리**:
  1. **패딩**: 데이터를 특정 형식으로 패딩하여 암호화합니다.
  2. **암호화**: 패딩된 데이터를 공개 키로 암호화합니다.
  3. **복호화**: 개인 키로 암호문을 복호화한 후 패딩을 제거합니다.
- **주로 사용되는 부분**:
  - **데이터 암호화**: 데이터의 기밀성을 보장하며, 안전한 키 전송에 사용됩니다.
  - **키 교환**: 암호화된 키를 안전하게 교환하는 데 사용됩니다.

### 7\. ECDH \(Elliptic Curve Diffie\-Hellman\)

- **작동 원리**:
  1. **키 생성**: 비밀 개인 키와 공개 키를 생성합니다.
  2. **키 교환**: 상대방의 공개 키를 사용하여 동일한 공유 비밀 키를 생성합니다.
- **주로 사용되는 부분**:
  - **키 교환**: 두 당사자 간에 안전하게 공유 비밀 키를 교환하는 데 사용됩니다.
  - **암호화**: 생성된 공유 비밀 키를 사용하여 대칭 암호화를 수행합니다.
- **향상된 버전**:
  - **ECDH with Curve25519**
    - **특징**: Curve25519 타원 곡선을 사용하여 키 교환을 수행합니다.
    - **장점**: 빠르고 안전한 키 교환을 제공하며, 고성능 암호화 요구를 충족합니다.
  - **ECDH with NIST Curves**
    - **특징**: NIST에서 정의한 타원 곡선을 사용하여 키 교환을 수행합니다.
    - **장점**: 표준화된 곡선을 사용하여 다양한 보안 시스템에서 호환성과 안정성을 제공합니다.
