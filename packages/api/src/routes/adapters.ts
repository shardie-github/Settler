import { Router, Request, Response } from "express";
import { AuthRequest } from "../middleware/auth";
import { get, set } from "../utils/cache";
import { logError } from "../utils/logger";

const router = Router();

const ADAPTERS = [
  {
    id: "stripe",
    name: "Stripe",
    description: "Reconcile Stripe payments and charges",
    version: "1.0.0",
    config: {
      required: ["apiKey"],
      optional: ["webhookSecret"],
    },
    supportedEvents: ["payment.succeeded", "charge.refunded"],
  },
  {
    id: "shopify",
    name: "Shopify",
    description: "Reconcile Shopify orders and transactions",
    version: "1.0.0",
    config: {
      required: ["apiKey", "shopDomain"],
      optional: ["webhookSecret"],
    },
    supportedEvents: ["order.created", "order.updated", "transaction.created"],
  },
  {
    id: "quickbooks",
    name: "QuickBooks",
    description: "Reconcile QuickBooks transactions",
    version: "1.0.0",
    config: {
      required: ["clientId", "clientSecret", "realmId"],
      optional: ["sandbox"],
    },
    supportedEvents: ["transaction.created", "transaction.updated"],
  },
  {
    id: "paypal",
    name: "PayPal",
    description: "Reconcile PayPal transactions",
    version: "1.0.0",
    config: {
      required: ["clientId", "clientSecret"],
      optional: ["sandbox"],
    },
    supportedEvents: ["payment.completed", "refund.completed"],
  },
];

// List available adapters (cached)
router.get("/", async (req: Request, res: Response) => {
  try {
    const cacheKey = 'adapters:list';
    const cached = get<any[]>(cacheKey);

    if (cached) {
      return res.json({
        data: cached,
        count: cached.length,
      });
    }

    // Cache for 1 hour
    set(cacheKey, ADAPTERS, 3600);

    res.json({
      data: ADAPTERS,
      count: ADAPTERS.length,
    });
  } catch (error: any) {
    logError('Failed to fetch adapters', error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "Failed to fetch adapters",
    });
  }
});

// Get adapter details
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    // In production, fetch from adapter registry
    const adapter = {
      id,
      name: id.charAt(0).toUpperCase() + id.slice(1),
      description: `Adapter for ${id}`,
      version: "1.0.0",
      config: {
        required: ["apiKey"],
        optional: [],
      },
      documentation: `https://docs.settler.io/adapters/${id}`,
    };

    res.json({ data: adapter });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      message: "Failed to fetch adapter",
    });
  }
});

export { router as adaptersRouter };
