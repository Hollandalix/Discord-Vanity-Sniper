# Discord Vanity Sniper Bot

Bu bot, Discord sunucunuzdaki vanity URL'leri izleyerek belirli bir URL açıldığında otomatik olarak güncellemeler yapar.
- 15 Yıldızda Daha İyisi Paylaşılır -

## Nasıl Çalışır?

Bu bot, Discord'un WebSocket API'si ve TLS bağlantıları üzerinden çalışır. İşlevleri şunlardır:

- **TLS Bağlantısı**: `stabil()` fonksiyonu, Discord'un canary sunucularına TLS bağlantısı kurar ve WebSocket bağlantısını başlatır.
  
- **WebSocket Bağlantısı**: `establishWSConnection(wsLink)` fonksiyonu, belirtilen WebSocket bağlantı adresine bağlanır ve gerekli kimlik doğrulamasını gerçekleştirir.

- **Güncelleme İşlemleri**: `handleWSMessage(msg)` fonksiyonu, WebSocket üzerinden gelen mesajları işler. `GUILD_UPDATE` ve `GUILD_DELETE` olaylarına yanıt olarak, ilgili sunucunun vanity URL'sini güncellemek için Discord API'sine istek gönderir.

- **Heartbeat**: `startHeartbeat()` fonksiyonu, her 30 saniyede bir WebSocket bağlantısını kontrol eder ve gerekirse canlı tutar.

## Kurulum

1. **Gereksinimler**:
   - Node.js'in ve npm'in yüklü olduğundan emin olun.
   - Bir Discord botu oluşturun ve token'ınızı edinin.
   - `config.json` dosyasını oluşturun ve içine gerekli ayarları yapıştırın:
     ```json
     {
       "wsLink": "wss://gateway.discord.gg/?v=9&encoding=json",
       "token": "YOUR_DISCORD_BOT_TOKEN",
       "serverId": "YOUR_SERVER_ID"
     }
     ```

2. **Bağımlılıkları Yükleme**:
   ```bash
   npm install

3. **Botu Çalıştırma**:
   ```bash
   node index.js

4. **Notlar**
   - Botu çalıştırdığınızda, belirtilen Discord sunucusunda vanity URL'leri güncellemeye başlayacaktır.
   - Hata durumlarında konsoldan hata mesajlarını takip edebilirsiniz.

## Katkıda Bulunma Veya Satın Alma
  - Katkıda Bulunmak İçin https://discord.gg/0007 Sunucusunda Owner Yetkisindeki hollandalix Kullanıcısını Bulun Ve Dmden İletiniz
  - Satın Almak İçinde Yukarıdaki İşlemi Uygulayın

## İletişim 

  - Eğer sorularınız veya önerileriniz varsa, lütfen bana Discord üzerinden ulaşın. Discord Adresim hollandalix
