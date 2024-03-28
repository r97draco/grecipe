# Grecipe CS 476 Project

## Overview

A full-stack web Application to generate Recipes from receipts and save the data for all various members of family to use.

## Getting Started

### Prerequisites

- Node.js (v14 or higher recommended)
- npm (v6 or higher recommended)

### Installation

Clone the repository to your local machine:

```bash
git clone https://github.com/r97draco/grecipe.git
cd grecipe
```

#### Client Setup

Navigate to the client directory and install the dependencies:

```bash
cd client
npm install
```

To start the client development server:

```bash
npm start
```

The application should now be running on [http://localhost:3000](http://localhost:3000).

#### Server Setup

Navigate to the server directory and install the dependencies:

```bash
cd server
npm install
```

To start the server for development:

```bash
npm run dev
```

The server will be running on [http://localhost:9191](http://localhost:9191).

### Environment Variables

Client .env :
```
REACT_APP_VERSION = v1.0
REACT_APP_API_URL=http://localhost:9191
# For server : https://grecipe.onrender.com
```

Server .env :
```
PORT=9191

NODE_ENV = "development"

MONGO_URI = mongodb+srv://sjagroop212:Grecipe2024@cluster0.kaypmkj.mongodb.net/

# Spoonacular API
SPOONACULAR_API_KEY="df41a01e17034106820fee0845017514"


# Firebase Admin SDK
FIREBASE_TYPE="service_account"
FIREBASE_PROJECT_ID="grecipe-f4676"
FIREBASE_PRIVATE_KEY_ID="ac5c44b1f47ae6f4f292a0dc0e239589a5142d39"
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCahmeGv4xK5tam\n4P/Pi6Sv1PyXXxwV4wNBW+xKm/+H9/4r0CKV+8YjhNaIvTHCBupTraDbVMvhegzQ\nd2BeuXsfJA62YF7HWPtnLqTbF2qs5YtDErPIb8vUn/etntneMmb83ZVdZ6MpKGQT\nQN1xsvdNA6oVwhGU0mbl9fIL6TC48ZPrat2uiLwcETuKU+72/1Jzt8ENsywjoXjs\ndXfhp0KSs95mXUcwPPYzRxFT7qoOW4r2q45KYDaxkv9WJygh7afueUaJU9flW6Xs\nna393U/R21x0FktkYvXkLE2e82wWZ2Az7yq3TbdvC8CNUy7A+m9669tIFmMey1DD\nV3Sub/8fAgMBAAECgf8AtEbEgRr35xVorUh9KaXBJ2H/TppSKeFZ6uaoxbfkZrzs\ndjEHffOT4IcZwxhMShEcpdiV0ffGj0fVALZFDZNXZlKq13BBzaYCUl7DS4Kw8bAw\nyLpeWiQTqVGiTkGv7DWL8XaSIRFynpHWL0rTDyhmsXLqUSLDYDIX2jHAMXqHXTtU\nPY2LuD87u6l8Hqr2OLGDTtOR4Z7gktg3EbvAJnP8/iC3CvMlLLOrrW78TL/4BpPS\n8wWfO58U5cU0DzpyRwamV7EZFmRNfzTF8F9QJgtbhgfZ0F4xcqqdvtiMgVUfvzV1\nBs2dxpy7S4PDnC9vx0eILKOa6MgV/Qt5Il1CE8UCgYEAzsYxGpQX7884eiqn68Vr\nzgBc2o0zVeYmrakvHpr13v44qDDCTnox7HvcOCaduDht9xNjfxTw2pFWxMk8/ELN\nBTT0Z1qGpda7drGBmRV0+KdKAg899NaiouBP42SLgahKHx2+Ld+yocFDNS/YRN/l\nAw+e/lXNoyK5XBJAvawzh+MCgYEAv0/l8gMwjXXLI9ivFdwoUQVZk5wM5qUli+h2\nN6lgIKBhv33khlGaUD+dIx6vklBRIpRFSLRehNLu/9bUmEuUaY057Dqq3HAwhj/X\nlHYZ6Bup46uDwrYoRPKbl1sUO8pmggccb8ZEXS/bovjzuw2c3yxL6MMYd+Vi/RwV\nzqFa+JUCgYEArWS7lqsra3jcxm1wxSCXZ3ccZlVUACtwsd4W2lZd6jJK9pd0yXRk\n2wd+w0N2rR388N08aTv5QX/xQDH0xyGJZV1juivKj9UC/OSbZfD9VuqKADIh5Wf7\nmBP8ShZtejvSdEdvzG4zELvNDRPjCtap56g4ztTLDYs33wKbcbKuv7sCgYAb/p8R\nWPIj4RbGuhB0zHCB2pyPAwjIP2ZNIMkbwAc2/wEOumdUWGCSWZyu5PCgImyc+MFi\nsDIckZkzisY1OuoOwAG31aXm9+vB2Vm8ecO0uUeU7yYquekOncmyzjsZvLZfVJcO\nrB6Y3EXxhSh1OLq51YuOFe5grQpdK1ztjaL4OQKBgQCm4IICp2NnDwBG7a2zcBEY\njibCk2rx7QFjbBR0X79A108iWYkHsydNjpgQDG6+JKxaVfXRsls0rmXhhgCkJCgH\nUK2EyORXRk35Ld5S8awbgE/5sc3eRnR8HohqPS8U+T+itfvCmMdUQuQsjP5q8EAZ\na09CUpvGbjdBN9wR1OowpA==\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL="firebase-adminsdk-3at7g@grecipe-f4676.iam.gserviceaccount.com"
FIREBASE_CLIENT_ID="106805527609914957537"
FIREBASE_AUTH_URI= "https://accounts.google.com/o/oauth2/auth"
FIREBASE_TOKEN_URI="https://oauth2.googleapis.com/token"
FIREBASE_AUTH_PROVIDER="https://www.googleapis.com/oauth2/v1/certs"
FIREBASE_CLIENT_CERT="https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-3at7g%40grecipe-f4676.iam.gserviceaccount.com"
FIREBASE_UNIVERSE_DOMAIN="googleapis.com"
```

Replace the values with your actual configuration details.

## Features

- **Advanced Authentication**: Secure authentication system using `jsonwebtoken` and `firebase-admin`.

## License

This project is licensed under the MIT License - see the `LICENSE` file for details.

## Acknowledgements

- [Axios](https://axios-http.com/)
- [Firebase](https://firebase.google.com/)
- ...and all other fantastic open-source projects.
