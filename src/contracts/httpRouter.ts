import { Router } from "express";

export interface HttpROuter {
    init(): Router
}