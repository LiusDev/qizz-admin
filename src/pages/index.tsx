import { Title, getRadius } from "@mantine/core"
import Head from "next/head"
import AdminLayout from "@/components/layouts/AdminLayout"
import { useEffect, useState } from "react"
import doAxios from "@/utils/doAxios"

export default function Home() {
    const [data, setdata] = useState(null)

    const fetchdata = async () => {
        const { response } = await doAxios("GET", "/")
        setdata(response)
    }

    useEffect(() => {
        fetchdata()
    }, [])

    return (
        <>
            <Head>
                <title>Qizz Admin</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link
                    rel="icon"
                    href="/qizz_logo.png"
                    style={{ borderRadius: getRadius("xs") }}
                />
            </Head>
            <AdminLayout>
                <main>
                    <Title order={1}>Qizz Admin</Title>
                    <p>{data}</p>
                </main>
            </AdminLayout>
        </>
    )
}
