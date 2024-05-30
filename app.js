const {
  createBot,
  createProvider,
  createFlow,
  addKeyword,
} = require("@bot-whatsapp/bot");

const QRPortalWeb = require("@bot-whatsapp/portal");
const BaileysProvider = require("@bot-whatsapp/provider/baileys");
const JsonFileAdapter = require("@bot-whatsapp/database/json");
const { v4: uuidv4 } = require('uuid');


const flujoTest = addKeyword([
  "hola",
  "buenas",
  "buena",
  "alo",
  "tarde",
  "dia",
  "noche",
  "ola",
  "hello"
])
  .addAnswer("🙌 Hola, Bienvenid@ al bot de CTP Prograprihcs ")
  .addAnswer(
    [
      "💡 Escribe la opción para continuar...",
      "1️⃣  Crear placa desde cero",
      //"2️⃣  Crear placa con archivo adjunto",
    ],
    {
      capture: true,
    },
    async (ctx, { flowDynamic, state }) => {
      await state.update({ opt: ctx.body });
      const myState = state.getMyState();
    }
  )
  .addAnswer(
    [
      "Escribe la opción del tipo de placa para continuar",
      "👉 GTO46 (12x12x12)",
      "👉 GTO52 (20x20x20)",
      "👉 MO (40x30x29)",
    ],
    {
      capture: true,
    },
    async (ctx, { flowDynamic, state }) => {
      await state.update({ tipo_placa: ctx.body });
      const myState = state.getMyState();
    }
  )
  .addAnswer(
    ["Dimensiones de su material a realizar 📐"],
    {
      capture: true,
    },
    async (ctx, { flowDynamic, state }) => {
      await state.update({ dimensiones: ctx.body });
      const myState = state.getMyState();
    }
  )
  .addAnswer(
    ["Escriba la cantidad"],
    {
      capture: true,
    },
    async (ctx, { flowDynamic, state }) => {
      await state.update({ cantidad: ctx.body });
      const myState = state.getMyState();
    }
  )
  .addAnswer(
    [
      "Escribe tu tipo de marterial 📐", // Escribe los colores que requiera: ( Ejemplo: KCM )
      "[*A*] Bon", "[*B*] Triplex", "[*C*] Cuche", "[*E*] Oficio"
    ],
    {
      capture: true,
    },
    async (ctx, { flowDynamic, state }) => {
      await state.update({ material: ctx.body });
      const myState = state.getMyState();
    }
  )
  .addAnswer(
    [
      "Escribe los colores que requiera: ( Ejemplo: KCM )", // Escribe los colores que requiera: ( Ejemplo: KCM )
    ],
    {
      capture: true,
    },
    async (ctx, { flowDynamic, state }) => {
      await state.update({ colores: ctx.body });
      const myState = state.getMyState();
    }
  )
  .addAnswer("Esta es tu solicitud:", null, async (_, { flowDynamic, state }) => {
    const myState = state.getMyState();
    await flowDynamic(`*Codigo de Pedido:* ${uuidv4()} \n *Tipo de placa:* ${myState.tipo_placa} \n *Dimensiones:* ${myState.dimensiones} \n *Material:* ${myState.material} \n *Cantidad:* ${myState.cantidad} \n *Colores:* ${myState.colores}`);
  })
  .addAnswer("🤖🤖 Gracias por escribirnos confirme tu solicitud");


const main = async () => {
  const adapterDB = new JsonFileAdapter();
  const adapterFlow = createFlow([flujoTest]);
  const adapterProvider = createProvider(BaileysProvider);

  createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  });

  QRPortalWeb();
};

main();
