import discord
from discord.ext import commands
import aiohttp
import os
import logging

logging.basicConfig(level=logging.INFO)
print("🚀 Lancement du bot Z.E.N.A...")

TOKEN = os.getenv("DISCORD_TOKEN")
API_BASE = "https://z-e-n-a-ranked.onrender.com/api"

# 🔍 Test temporaire : vérifier si Render lit bien la variable d'environnement
if not TOKEN:
    print("❌ Render ne trouve pas la variable DISCORD_TOKEN")
    exit(1)
else:
    print(f"✅ Variable DISCORD_TOKEN trouvée ({len(TOKEN)} caractères)")

intents = discord.Intents.default()
intents.message_content = True

bot = commands.Bot(command_prefix="!", intents=intents)

@bot.event
async def on_ready():
    print(f"✅ Connecté en tant que {bot.user}")

@bot.command()
async def ping(ctx):
    await ctx.send("🏓 Pong !")

@bot.command()
async def mmr(ctx, joueur: str):
    async with aiohttp.ClientSession() as session:
        async with session.get(f"{API_BASE}/player/{joueur}") as resp:
            if resp.status == 404:
                await ctx.send("❌ Joueur introuvable.")
                return
            data = await resp.json()
            mmr = data.get("mmr", "Inconnu")
            await ctx.send(f"🏆 **{joueur}** a **{mmr} MMR**.")

bot.run(TOKEN)