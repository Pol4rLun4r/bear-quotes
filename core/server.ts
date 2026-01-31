import { createDatabase } from "./db/connection";
import { createApp } from "./app";

import { PORT, DB_PATH } from "./config/env";

const db = createDatabase(DB_PATH);
const app = createApp(db);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});