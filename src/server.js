import { createServer } from "miragejs"
import { dashboardData } from './jsondata'

export default function () {
    createServer({
        routes() {
            this.namespace = "api"

            this.get("/dashboard", () => ({
                data: dashboardData,
            }))
        },
    })
}