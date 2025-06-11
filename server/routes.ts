import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema } from "@shared/schema";
import { z } from "zod";
import { Client } from '@replit/object-storage';

export async function registerRoutes(app: Express): Promise<Server> {
  const client = new Client();

  // API endpoint to list images from object storage
  app.get("/api/images", async (req, res) => {
    try {
      const result = await client.list();
      if (!result.ok) {
        return res.status(500).json({ success: false, message: "Failed to list images" });
      }
      
      const imageFiles = result.val.filter(file => 
        /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
      );
      
      const categorizedImages = {
        portfolio: imageFiles.filter(file => file.startsWith('Feiras/')),
        services: imageFiles.filter(file => file.startsWith('Servicos/')),
        team: imageFiles.filter(file => file.startsWith('Equipe/')),
        gallery: imageFiles.filter(file => file.startsWith('Galeria/')),
        other: imageFiles.filter(file => !file.match(/^(Feiras|Servicos|Equipe|Galeria)\//))
      };
      
      res.json({ success: true, images: categorizedImages });
    } catch (error) {
      console.error("Error listing images:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  });

  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);
      
      console.log("New contact message received:", {
        id: message.id,
        nome: message.nome,
        email: message.email,
        telefone: message.telefone,
        mensagem: message.mensagem.substring(0, 100) + (message.mensagem.length > 100 ? "..." : ""),
        createdAt: message.createdAt
      });
      
      res.status(201).json({ 
        success: true, 
        message: "Mensagem enviada com sucesso! Retornaremos em breve.",
        id: message.id 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Dados inválidos", 
          errors: error.errors 
        });
      } else {
        console.error("Error creating contact message:", error);
        res.status(500).json({ 
          success: false, 
          message: "Erro interno do servidor" 
        });
      }
    }
  });

  // Get contact messages (for admin purposes)
  app.get("/api/contact", async (req, res) => {
    try {
      const messages = await storage.getContactMessages();
      res.json(messages);
    } catch (error) {
      console.error("Error fetching contact messages:", error);
      res.status(500).json({ 
        success: false, 
        message: "Erro interno do servidor" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
