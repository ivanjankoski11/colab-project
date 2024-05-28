import { DataSource } from "typeorm";
import * as entities from "../models";
import { env } from "process";

export const AppSource = new DataSource({
	type: "postgres",
	host: "localhost",
	port: 54321,
	username: "postgres",
	password: "root",
	database: "colab_db",
	synchronize: true,
	entities: Object.values(entities),
});
