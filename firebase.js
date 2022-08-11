import { initiliazeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  type: "service_account",
  project_id: "koinovoter",
  private_key_id: "79601a638719ba5895bab51397fd943816043e75",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCyO2k0uE4WI15M\nO7rIiB6w2QpRoVp15IM+/uuqAJnPzUpLXYmiVt8Xa8cprp+z170T+AiUjGTpvEvk\nxS2XWKU7mlqO6gFLe97L1UDoJlWzvZ0m2Xw1pTs6GCzQ3KWdS6TwLDtUroKatAwQ\nX7ysHnBQFT+KsYhaSY+oXI98+BnjyOzxKBQbfjIDdk4vkW93GYtM4m6V9geVw9A5\npK6jgVlNbu22RQJOpl0fbARP8KrDPfaWzix04tdy+tbIIDwPLskFcYrgvIVSNmDB\nWm8ppy08qGLpNZU0X1ETVbTZ/+nA1e1uzVZ0LJYzN5UVC300WjCLaP2KA/OBEB7h\n4wK7QO2pAgMBAAECggEAFVmr04CI/RqpRP9KM5OnvoZPV8I5AoKYTMNvgk6+Xh/Q\nyKiosDlREd6LrfTwxVPAfvwBNh8/xuaTHlFW8ehw6awGsVQ7ibnp0VfHRc/yx/xc\nrw7SM+BqUP4cnzvxPF+Xf1xDErSxaTwMbmkzghhG2rcC5Le51lv1wSSuXRlgy5H+\nz3tGJkK/pgHOE31kkTVh8idNTCnpBPGA52cf/fQi2VALPFA5Vrqy7ifOLqr9NAnN\nKwn8Ik+JuPMkByQ7Mh38eY0XxjayssTF4oSBY8PX3+M1tuzwBl/JesMltYKrLPQe\ndDTcpcgwaREzvtRvPQi6hvtw9Zna748TuVZoQ1wp8QKBgQDXs2xOtj2d1kdkA1Bk\nTdI/XGEFzXpYuU603m61jNRgyF4ewiJSIApSHujktEHKiGI2AL2+D3fg7l3MGgbE\nAtchiiOtcTx2scfSfYCBB5RewTPPbBTa9tIMXUvpUyPRa2chJIfV0I7iqboGhvTw\nGAGfvnDZaGh9Hvwtv3rTb8JKEQKBgQDTh+yOzZVlvs/ZWWwlhrqgBjsyI9N22AnH\nnZ4rf9OyOIcqMJTYzlvx7jcLSy66LKpNZ5ZlIj31IvmHg5Cjp8Eg8cQR1g5XNPuE\n09j0eIUnNivHDzLJSZQSdpoKkiaF1qXn62sVvAI6alEYwSO6H8yr7KM6w7hcYFMj\nCGe/2GqSGQKBgC7WmEMzUYfvmsr96TwOpgP6NFtFNjcD7jJaRqIHtapaeA2nzDoX\nGQaiDaJz/gFTwjfFy230/+wI9rc2Q5fWog53Z63m8+E2U5TCid/63F4DCBQXfSPb\nCtuCetRsqE92SgupWhG02wIfJvT540ArhlbAzNJ42I+q5cmtVaeKEh9xAoGAMR5U\n7ewLDu858Gx1UllwqIwJ3uC2z9fmnXWaLtul2rKJoGBbj+SLMShxm6u/k/efLA4r\nvBwxauTOMIt6YKYpkG7TapjcB6AD75oJvOrncG2ByN1cm6T8PzVPG7lIPLfVGn9u\nBEP9+HaLkkX299c+fYWbeZ/NBZZQd8gR31hvlrECgYArINlcy1uj6zS9YlvcRLk/\nf8tMLdNL/vs/tZD8Q4PuAR4AfzaboLmDF2uc8iK+/06IUZBOX/CFJQKDbTFGf11g\ns5EbeioOcJ+zcu/LNhivvM92rdehcIr+t6M/KRwyKwa9KXJNsC0l+R1tpMRvzRMk\n5lKrrWcbrITYq2ihlq+zrw==\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk-ie0op@koinovoter.iam.gserviceaccount.com",
  client_id: "117865832585798450944",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-ie0op%40koinovoter.iam.gserviceaccount.com",
};
const app = initiliazeApp(firebaseConfig);
const storage = getStorage(app);
