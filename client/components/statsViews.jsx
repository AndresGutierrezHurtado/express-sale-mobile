import React, { useState } from "react";
import { View, Text, Pressable, ActivityIndicator } from "react-native";
import { LineChart } from "react-native-chart-kit";

// Hooks
import { useGetData } from "../hooks/useFetchData.js";

function SellerStats({ user, reloadUser }) {
    const [graphicData, setGraphicData] = useState("all");
    const [currentMonth, setCurrentMonth] = useState(null);
    const [year, setYear] = useState(new Date().getFullYear());

    const {
        data: pendingOrders,
        loading: pendingOrdersLoading,
        reload: reloadPendingOrders,
    } = useGetData(`/orders?order_status=pendiente,enviando&user_id=${user.user_id}`);

    const yearSales = [];
    for (let i = 1; i <= 12; i++) {
        let infoMes =
            user.worker.month_sales.find(
                (el) => el.month == i && el.year == (year ? year : new Date().getFullYear())
            ) || null;
        yearSales.push({
            month: i,
            monthToText: new Date(0, i - 1).toLocaleString("es", { month: "long" }),
            money: infoMes ? parseInt(infoMes.total_money) : 0,
            sales: infoMes ? infoMes.total_products : 0,
            year: infoMes ? infoMes.year : parseInt(year),
        });
    }

    if (pendingOrdersLoading) return <ActivityIndicator size="large" color="#0000ff" />;
    return (
        <View className="w-full px-3 py-10">
            <Text>Estadísticas {user.role.role_name}</Text>
            <SellerGraphic
                data={yearSales}
                setCurrentMonth={setCurrentMonth}
                graphicData={graphicData}
            />
            <Text>Envios hechos: {user.shippings_count}</Text>
            <Text>Envios hechos: {user.shippings_money}</Text>
            <Text>Envios hechos: {user.sales_count}</Text>
            <Text>Envios hechos: {parseInt(user.sales_money).toLocaleString("es-CO")}</Text>
        </View>
    );
}
function SellerGraphic({ data, setCurrentMonth, graphicData }) {
    const chartData = {
        labels: data.map((el) => el.monthToText.charAt(0).toUpperCase() + el.monthToText.slice(1)),
        datasets: [
            {
                label: "Dinero recaudado",
                data: data.map((el) => el.money),
                backgroundColor: "rgba(53, 162, 235, 0.5)",
                borderColor: "rgba(126, 34, 206, 1)",
            },
            {
                label: "Número de productos vendidos",
                data: data.map((el) => el.sales),
                backgroundColor: "rgba(255, 99, 132, 0.5)",
                borderColor: "rgba(255, 99, 132, 1)",
            },
        ],
    };

    if (graphicData === "money") chartData.datasets.pop();
    if (graphicData === "sales") chartData.datasets.shift();

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: `Estadísticas de ventas del año ${data[0].year}`,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
        onClick: (event, elements) => {
            if (elements.length === 0) return;
            setCurrentMonth(data[elements[0].index]);
        },
        interaction: {
            mode: "nearest",
            axis: "x",
            intersect: false,
        },
    };

    return (
        <View className="w-full">
            <View className="w-full">
                <LineChart
                    data={chartData}
                    width={350}
                    height={220}
                    chartConfig={{
                        decimalPlaces: 0,
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    }}
                    bezier
                    verticalLabelRotation={90}
                    style={{
                        borderRadius: 5,
                        width: "100%",
                        height: "100%",
                        margin: "auto",
                    }}
                />
            </View>
        </View>
    );
}

function DeliveryStats({ user, reloadUser }) {
    const [graphicData, setGraphicData] = useState("all");
    const [currentMonth, setCurrentMonth] = useState(null);
    const [year, setYear] = useState(new Date().getFullYear());

    const yearSales = [];
    for (let i = 1; i <= 12; i++) {
        let infoMes =
            user.worker.month_deliveries.find(
                (el) => el.month == i && el.year == (year ? year : new Date().getFullYear())
            ) || null;
        yearSales.push({
            month: i,
            monthToText: new Date(0, i - 1).toLocaleString("es", { month: "long" }),
            money: infoMes ? parseInt(infoMes.shipping_money) : 0,
            sales: infoMes ? infoMes.shippings_quantity : 0,
            year: infoMes ? infoMes.year : parseInt(year),
        });
    }

    return (
        <View className="w-full px-3 py-10">
            <Text>Estadísticas {user.role.role_name}</Text>
            <LineChart
                data={{
                    labels: ["January", "February", "March", "April", "May", "June"],
                    datasets: [
                        {
                            data: [
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100,
                            ],
                        },
                    ],
                }}
                width={350}
                height={220}
                chartConfig={{
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                }}
                bezier
                verticalLabelRotation={13}
                style={{
                    borderRadius: 5,
                }}
            />
            <Text>Envios hechos: {user.shippings_count}</Text>
            <Text>Envios hechos: {user.shippings_money}</Text>
            <Text>Envios hechos: {user.sales_count}</Text>
            <Text>Envios hechos: {parseInt(user.sales_money).toLocaleString("es-CO")}</Text>
        </View>
    );
}

function DeliveryGraphic({ data, setCurrentMonth, graphicData }) {
    const chartData = {
        labels: data.map((el) => el.monthToText),
        datasets: [
            {
                label: "Dinero recaudado",
                data: data.map((el) => el.money),
                backgroundColor: "rgba(53, 162, 235, 0.5)",
                borderColor: "rgba(126, 34, 206, 1)",
            },
            {
                label: "Número de envíos",
                data: data.map((el) => el.sales),
                backgroundColor: "rgba(255, 99, 132, 0.5)",
                borderColor: "rgba(255, 99, 132, 1)",
            },
        ],
    };

    if (graphicData === "money") chartData.datasets.pop();
    if (graphicData === "sales") chartData.datasets.shift();

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: `Estadísticas de envíos del año ${data[0].year}`,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
        onClick: (event, elements) => {
            if (elements.length === 0) return;
            setCurrentMonth(data[elements[0].index]);
        },
        interaction: {
            mode: "nearest",
            axis: "x",
            intersect: false,
        },
    };

    return (
        <View className="w-full overflow-x-auto">
            <View className="w-full h-[400px]">
                <LineChart
                    data={{
                        labels: ["January", "February", "March", "April", "May", "June"],
                        datasets: [
                            {
                                data: [
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                ],
                            },
                        ],
                    }}
                    width={350}
                    height={220}
                    chartConfig={{
                        decimalPlaces: 0,
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    }}
                    bezier
                    verticalLabelRotation={13}
                    style={{
                        borderRadius: 5,
                        width: "100%",
                        height: "100%",
                    }}
                />
            </View>
        </View>
    );
}

export { SellerStats, DeliveryStats, DeliveryGraphic, SellerGraphic };
