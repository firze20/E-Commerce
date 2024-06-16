import { Express } from "express";

declare global {
  var __APP__: Express; 
}
