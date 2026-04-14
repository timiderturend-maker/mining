import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
from pathlib import Path

load_dotenv(Path(__file__).parent / '.env')

mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'emergent_db')]

PRODUCTS = [
  {
    "id": "p1",
    "title": "Eden Basis Hashrate (10 TH/s)",
    "type": "Cloud Vertrag",
    "category": "Bitcoin Mining",
    "price": 45.99,
    "originalPrice": 55.99,
    "discount": 18,
    "image": "https://images.unsplash.com/photo-1635575623026-9b25cd510e4d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwyfHxiaXRjb2lufGVufDB8fHxyZWR8MTc3NjEyMjQwNHww&ixlib=rb-4.1.0&q=85",
    "inStock": True,
    "rating": 4.8,
    "description": "Perfekter Einstieg in das Bitcoin Mining. 10 TH/s garantierte Leistung ohne versteckte Kosten.",
    "long_description": "Der Eden Basis Hashrate Vertrag ist ideal für Einsteiger, die erste Erfahrungen mit dem Schürfen von Kryptowährungen machen möchten, ohne selbst teure Hardware anzuschaffen. Wir stellen 10 Terahashes pro Sekunde (TH/s) aus unseren hochmodernen Rechenzentren in Island zur Verfügung. Die Kühlung erfolgt zu 100% durch erneuerbare Energien (Geothermie und Wasserkraft). Tägliche Auszahlungen (nach Ablauf der 90-Tage-Sicherheitsfrist für Neukunden) direkt in dein Dashboard.",
    "specs": {
        "hashrate": "10 TH/s",
        "power_consumption": "0 W (Cloud)",
        "algorithm": "SHA-256",
        "maintenance_fee": "0.01 € / TH / Tag",
        "availability": "Sofort verfügbar"
    }
  },
  {
    "id": "p2",
    "title": "Antminer S19 Pro 110TH/s + Hosting",
    "type": "Hardware + Hosting",
    "category": "ASIC Hardware",
    "price": 1250.00,
    "originalPrice": 1500.00,
    "discount": 16,
    "image": "https://images.unsplash.com/photo-1639066648921-82d4500abf1a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1ODR8MHwxfHNlYXJjaHwxfHxzZXJ2ZXIlMjByYWNrfGVufDB8fHxibGFja3wxNzc2MTIyNDEwfDA&ixlib=rb-4.1.0&q=85",
    "inStock": True,
    "rating": 5.0,
    "description": "Eigener ASIC Miner im Eden Rechenzentrum gehostet. Volle Kontrolle, maximale Effizienz.",
    "long_description": "Kaufe deinen eigenen Bitmain Antminer S19 Pro (110 TH/s) und lass ihn direkt von unserem Expertenteam in unserem Tier-3 Rechenzentrum installieren. Du musst dir keine Sorgen um Lärm, Hitze oder hohe Stromrechnungen zu Hause machen. Du bezahlst lediglich eine günstige Hosting-Pauschale für Strom und Wartung, die direkt von deinen Mining-Erträgen abgezogen werden kann. Die Hardware gehört zu 100% dir und kann auf Wunsch jederzeit an dich versendet werden.",
    "specs": {
        "hashrate": "110 TH/s",
        "power_consumption": "3250 W",
        "algorithm": "SHA-256",
        "maintenance_fee": "0.065 € / kWh",
        "availability": "Setup in 48h"
    }
  },
  {
    "id": "p3",
    "title": "Eden Advanced Hashrate (50 TH/s)",
    "type": "Cloud Vertrag",
    "category": "Bitcoin Mining",
    "price": 215.00,
    "originalPrice": 215.00,
    "discount": 0,
    "image": "https://images.unsplash.com/photo-1658907030290-ce88ebe3a338?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHw0fHxiaXRjb2lufGVufDB8fHxyZWR8MTc3NjEyMjQwNHww&ixlib=rb-4.1.0&q=85",
    "inStock": True,
    "rating": 4.5,
    "description": "Erweiterte Hashpower für ambitionierte Miner. Solide Renditen bei mittlerem Investment.",
    "long_description": "Mit dem Advanced Hashrate Paket sicherst du dir 50 TH/s Leistung aus unserem Miner-Pool. Dies entspricht in etwa der halben Leistung eines modernen ASIC-Miners, jedoch ohne die Risiken von Hardwareausfällen. Falls ein Gerät im Rechenzentrum ausfällt, wird deine Hashrate automatisch von unseren Backup-Systemen übernommen (100% Uptime Guarantee).",
    "specs": {
        "hashrate": "50 TH/s",
        "power_consumption": "0 W (Cloud)",
        "algorithm": "SHA-256",
        "maintenance_fee": "0.009 € / TH / Tag",
        "availability": "Sofort verfügbar"
    }
  },
  {
    "id": "p4",
    "title": "Litecoin Scrypt Miner L7",
    "type": "Hardware",
    "category": "Litecoin Mining",
    "price": 4500.00,
    "originalPrice": 5000.00,
    "discount": 10,
    "image": "https://images.unsplash.com/photo-1635564854661-178add23dcec?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwzfHxiaXRjb2lufGVufDB8fHxyZWR8MTc3NjEyMjQwNHww&ixlib=rb-4.1.0&q=85",
    "inStock": False,
    "rating": 4.9,
    "description": "Der aktuell stärkste Scrypt Miner auf dem Markt für Litecoin und Dogecoin.",
    "long_description": "Der Bitmain Antminer L7 (9050M) ist das absolute Nonplusultra für das Scrypt-Mining. Er generiert gleichzeitig Litecoin (LTC) und Dogecoin (DOGE) durch Merged Mining. Durch seine extreme Effizienz übertrifft er alle Vorgängermodelle um Längen. Achtung: Aufgrund der extrem hohen Nachfrage ist dieses Modell derzeit vergriffen. Setze es auf deine Wunschliste, um bei Restocks sofort benachrichtigt zu werden.",
    "specs": {
        "hashrate": "9050 MH/s",
        "power_consumption": "3425 W",
        "algorithm": "Scrypt",
        "maintenance_fee": "N/A (Verkauf)",
        "availability": "Ausverkauft"
    }
  },
  {
    "id": "p5",
    "title": "Eden Whale Paket (1 PH/s)",
    "type": "VIP Cloud Vertrag",
    "category": "VIP Pakete",
    "price": 3999.00,
    "originalPrice": 4500.00,
    "discount": 11,
    "image": "https://images.unsplash.com/photo-1635575623026-9b25cd510e4d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwyfHxiaXRjb2lufGVufDB8fHxyZWR8MTc3NjEyMjQwNHww&ixlib=rb-4.1.0&q=85",
    "inStock": True,
    "rating": 5.0,
    "description": "Für Investoren. Satte 1 Petahash Leistung mit dediziertem Account Manager.",
    "long_description": "Das Eden Whale Paket richtet sich an Großinvestoren. Mit 1 Petahash pro Sekunde (1.000 TH/s) mietest du im Grunde einen kleinen Teil unseres gesamten Rechenzentrums an. Du profitierst von unseren niedrigsten Wartungsgebühren, einem 24/7 VIP Support via Telefon und Telegram sowie einem persönlichen Account Manager, der deine Hashrate auf Wunsch auf verschiedene Pools verteilt.",
    "specs": {
        "hashrate": "1 PH/s (1000 TH/s)",
        "power_consumption": "0 W (Cloud)",
        "algorithm": "SHA-256",
        "maintenance_fee": "0.007 € / TH / Tag",
        "availability": "Sofort verfügbar"
    }
  },
  {
    "id": "p6",
    "title": "Ethereum Classic Hashrate 500 MH/s",
    "type": "Cloud Vertrag",
    "category": "Ethereum Classic",
    "price": 89.99,
    "originalPrice": 99.99,
    "discount": 10,
    "image": "https://images.unsplash.com/photo-1639066648921-82d4500abf1a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1ODR8MHwxfHNlYXJjaHwxfHxzZXJ2ZXIlMjByYWNrfGVufDB8fHxibGFja3wxNzc2MTIyNDEwfDA&ixlib=rb-4.1.0&q=85",
    "inStock": True,
    "rating": 4.2,
    "description": "Mine Ethereum Classic (ETC) mit bewährten GPU-Rigs aus der Cloud.",
    "long_description": "Da Ethereum (ETH) auf Proof-of-Stake umgestellt hat, bieten wir unsere optimierten GPU-Rigs nun für das Mining von Ethereum Classic (ETC) an. Du erhältst garantierte 500 Megahashes pro Sekunde. Perfekt für die Diversifizierung deines Krypto-Portfolios abseits von Bitcoin.",
    "specs": {
        "hashrate": "500 MH/s",
        "power_consumption": "0 W (Cloud)",
        "algorithm": "EtHash",
        "maintenance_fee": "0.015 € / Tag",
        "availability": "Sofort verfügbar"
    }
  },
  {
    "id": "p7",
    "title": "Dogecoin Solo Miner",
    "type": "Cloud Vertrag",
    "category": "Dogecoin",
    "price": 29.99,
    "originalPrice": 35.00,
    "discount": 14,
    "image": "https://images.unsplash.com/photo-1658907030290-ce88ebe3a338?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHw0fHxiaXRjb2lufGVufDB8fHxyZWR8MTc3NjEyMjQwNHww&ixlib=rb-4.1.0&q=85",
    "inStock": True,
    "rating": 4.7,
    "description": "Much Hash. Very Wow. Direkter Dogecoin Cloud-Vertrag.",
    "long_description": "Werde Teil der Meme-Coin Revolution! Mit diesem speziellen Vertrag minen unsere L7 Scrypt-Miner exklusiv für dich im Dogecoin Solo-Modus. Zwar sind die Auszahlungen volatiler, aber wenn ein Block gefunden wird, gehört die volle Belohnung dir. Alternativ kann im Dashboard auch auf Pool-Mining umgestellt werden.",
    "specs": {
        "hashrate": "150 MH/s",
        "power_consumption": "0 W (Cloud)",
        "algorithm": "Scrypt",
        "maintenance_fee": "0.005 € / Tag",
        "availability": "Sofort verfügbar"
    }
  },
  {
    "id": "p8",
    "title": "Hosting Service (1 HE)",
    "type": "Hosting Service",
    "category": "Hosting Services",
    "price": 49.00,
    "originalPrice": 49.00,
    "discount": 0,
    "image": "https://images.unsplash.com/photo-1639066648921-82d4500abf1a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1ODR8MHwxfHNlYXJjaHwxfHxzZXJ2ZXIlMjByYWNrfGVufDB8fHxibGFja3wxNzc2MTIyNDEwfDA&ixlib=rb-4.1.0&q=85",
    "inStock": True,
    "rating": 4.9,
    "description": "Stell deinen eigenen Miner bei uns unter (Preis pro Monat).",
    "long_description": "Du besitzt bereits einen ASIC-Miner, aber dir fehlt der Platz oder der günstige Strom? Sende uns dein Gerät (bis max. 20kg / 1 Höheneinheit). Wir schließen es in unserem Rack an, kümmern uns um die Kühlung und die Netzwerkanbindung. Der Strompreis wird mit unschlagbaren 0,055 € pro kWh separat monatlich abgerechnet. 99.9% Uptime garantiert.",
    "specs": {
        "hashrate": "N/A",
        "power_consumption": "Max 3500W pro Slot",
        "algorithm": "Beliebig",
        "maintenance_fee": "Strom exklusive",
        "availability": "Freie Plätze"
    }
  }
]

async def seed_db():
    await db.products.delete_many({})
    await db.products.insert_many(PRODUCTS)
    print("Database seeded with products!")

if __name__ == "__main__":
    asyncio.run(seed_db())
