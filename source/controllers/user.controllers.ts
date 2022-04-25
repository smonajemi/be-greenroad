import { Request, Response, NextFunction } from "express";
import * as userService from "../services/user.services";
import { User } from "../types/user.types";
import axios, { AxiosResponse } from "axios";
import path from "path";
const filename = path.basename(__filename)

// getting all users
export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await userService.fetchUsers();
    req.body = result;
    res.send(req.body);
  } catch (err) {
    let error = "";
    for (const [key, value] of Object.entries([err])) {
      error = `${value}`;
    }
    res.json({
      message: error,
      root: filename
    });
    next(error);
  }
};

// getting a single user
export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    const user = await userService.findUserById(userId);
    req.body = user;
    res.send(req.body);
  } catch (err) {
    let error = "";
    for (const [key, value] of Object.entries([err])) {
      error = `${value}`;
    }
    res.json({
      message: error,
      root: filename
    });
    next(error);
  }
};

// adding a user
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userService.createUser(req.body);
    req.body = user;
    res.send(req.body);
  } catch (err) {
    let error = "";
    for (const [key, value] of Object.entries([err])) {
      error = `${value}`;
    }
    res.json({
      message: error,
      root: filename
    });
    next(error);
  }
};

// updating a user
export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    const user = await userService.updateUser(userId, req.body);
    req.body = user;
    res.send(req.body);
  } catch (err) {
    let error = "";
    for (const [key, value] of Object.entries([err])) {
      error = `${value}`;
    }
    res.json({
      message: error,
      root: filename
    });
    next(error);
  }
};

// deleting a user
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    const user = await userService.deleteUser(userId);
    req.body = user;
    res.send(req.body);
  } catch (err) {
    let error = "";
    for (const [key, value] of Object.entries([err])) {
      error = `${value}`;
    }
    res.json({
      message: error,
      root: filename
    });
    next(error);
  }
};
