---
title: JWE
slug: "jwe"
---

**JSON Web Encryption** (JWE)는 JSON 객체를 암호화하여 안전하게 전송하기 위한 표준입니다. JWE는 데이터의 기밀성을 보호하며, 데이터를 송신자와 수신자 사이에서 안전하게 전송하기 위해 사용됩니다. JWE는 **RFC 7516**에 정의되어 있으며, 주로 웹 애플리케이션과 API에서 민감한 데이터를 안전하게 전달할 때 사용됩니다.

### JWE의 구성요소

JWE는 JSON 데이터를 암호화하여 다음과 같은 구성 요소로 이루어진 토큰으로 표현됩니다:

1. **Protected Header**: 암호화 알고리즘 및 키 관리 방법을 정의한 정보가 포함됩니다. 이 헤더는 암호화되지 않으며, Base64Url로 인코딩됩니다.
2. **Encrypted Key**: 데이터 암호화에 사용된 대칭 키를 비대칭 암호화 알고리즘(예: RSA)으로 암호화한 것입니다. 수신자는 이 암호화된 키를 자신의 비공개 키로 복호화하여 실제 데이터를 복호화하는 데 필요한 대칭 키를 얻습니다.
3. <strong>Initialization Vector (IV)</strong>: 대칭 키 암호화에서 사용되는 초기화 벡터로, 암호화 과정에서 데이터의 보안을 강화하기 위해 사용됩니다.
4. **Ciphertext**: 실제로 암호화된 JSON 데이터입니다. 이 데이터는 수신자가 제공한 키로 복호화할 수 있습니다.
5. **Authentication Tag**: 데이터의 무결성을 보장하기 위한 태그로, 데이터가 전송 중에 변경되지 않았음을 확인하는 데 사용됩니다.

### JWE의 구조

JWE는 **Compact Serialization** 형식과 **JSON Serialization** 형식으로 표현될 수 있습니다. 일반적으로 Compact Serialization이 더 많이 사용됩니다.
**Compact Serialization** 형식은 다음과 같이 5개의 Base64Url로 인코딩된 값이 마침표(`.`)로 구분되어 하나의 문자열로 연결됩니다:

```
Base64Url(Protected Header) . Base64Url(Encrypted Key) . Base64Url(IV) . Base64Url(Ciphertext) . Base64Url(Authentication Tag)
```

#### 1\. Protected Header

```
{ "alg": "RSA-OAEP", "enc": "A256GCM" }
```

이 JSON 객체는 암호화 알고리즘 `RSA-OAEP`와 콘텐츠 암호화 알고리즘 `A256GCM`을 사용한다고 명시합니다.
Base64Url로 인코딩하면:

```
eyJhbGciOiAiUlNBLU9BRVAiLCAiZW5jIjogIkEyNTZHQ00ifQ
```

#### 2\. Encrypted Key

* RSA-OAEP 알고리즘을 사용하여 대칭 키를 암호화한 후, Base64Url로 인코딩한 값입니다.

#### 3\. Initialization Vector \(IV\)

* AES-GCM 암호화에서 사용되는 초기화 벡터를 Base64Url로 인코딩한 값입니다.

#### 4\. Ciphertext

* AES-GCM 알고리즘을 사용하여 실제 데이터를 암호화한 후 Base64Url로 인코딩한 값입니다.

#### 5\. Authentication Tag

* 암호화된 데이터의 무결성을 보장하기 위해 생성된 태그입니다.

#### 예제

```python
from authlib.jose import JsonWebEncryption
from authlib.jose import jwk
from cryptography.hazmat.primitives.asymmetric import rsa

# RSA 키 생성
private_key = rsa.generate_private_key(public_exponent=65537, key_size=2048)
public_key = private_key.public_key()

# JWK 생성
public_jwk = jwk.dumps(public_key, kty='RSA')

# JWE 암호화
jwe = JsonWebEncryption()
header = {"alg": "RSA-OAEP", "enc": "A256GCM"}
payload = "Sensitive information"
encrypted_jwe = jwe.serialize_compact(header, payload.encode('utf-8'), public_jwk)

print("Encrypted JWE:", encrypted_jwe)

# JWE 복호화
private_jwk = jwk.dumps(private_key, kty='RSA')
decrypted_payload = jwe.deserialize_compact(encrypted_jwe, private_jwk)
print("Decrypted Payload:", decrypted_payload.decode('utf-8'))
```
