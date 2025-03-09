import React, { useState } from "react";
import { View, Text, ActivityIndicator, Dimensions, ScrollView } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Picker } from "@react-native-picker/picker";

// Hooks
import { useGetData } from "../hooks/useFetchData.js";

// Components
import { BoxesIcon, SalesIcon, TruckIcon } from "./icons.jsx";

function SellerStats({ user, reloadUser }) {
    const [graphicData, setGraphicData] = useState("money");
    const [year, setYear] = useState(new Date().getFullYear());
    const [currentMonth, setCurrentMonth] = useState(null);

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
        <View className="w-full px-3 py-10 gap-10">
            <Text className="text-3xl font-extrabold">Estadísticas del {user.role.role_name}</Text>
            <View horizontal className="bg-white p-5 rounded border border-gray-300 w-full gap-8">
                <View className="flex-row justify-between items-center">
                    <Text className="text-2xl font-bold">Año:</Text>
                    <View className="border border-gray-400 rounded-lg">
                        <Picker style={{ width: 150 }} selectedValue={year} onValueChange={setYear}>
                            <Picker.Item
                                label={new Date().getFullYear()}
                                value={new Date().getFullYear()}
                            />
                            <Picker.Item
                                label={new Date().getFullYear() - 1}
                                value={new Date().getFullYear() - 1}
                            />
                        </Picker>
                    </View>
                </View>
                <View className="flex-row justify-between items-center">
                    <Text className="text-2xl font-bold">Elemento:</Text>
                    <View className="border border-gray-400 rounded-lg">
                        <Picker
                            style={{ width: 150 }}
                            selectedValue={graphicData}
                            onValueChange={setGraphicData}
                        >
                            <Picker.Item label="Dinero" value="money" />
                            <Picker.Item label="Envios" value="sales" />
                        </Picker>
                    </View>
                </View>
                <ScrollView horizontal className="w-full">
                    <Graphic
                        data={yearSales}
                        setCurrentMonth={setCurrentMonth}
                        graphicData={graphicData}
                    />
                </ScrollView>
                <View className="flex-row gap-2">
                    <View className="p-3 border border-gray-400 rounded-lg flex-1">
                        <BoxesIcon className="text-center mb-3" size={32} />
                        <Text className="text-xl font-bold text-center">Ventas hechas</Text>
                        <Text className="text-4xl font-extrabold text-center">
                            {user.sales_count}
                        </Text>
                    </View>
                    <View className="p-3 border border-gray-400 rounded-lg flex-1">
                        <SalesIcon className="text-center mb-3" size={32} />
                        <Text className="text-xl font-bold text-center">Dinero hecho</Text>
                        <Text className="text-4xl font-extrabold text-center">
                            {parseInt(user.sales_money).toLocaleString("es-CO")}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

function DeliveryStats({ user, reloadUser }) {
    const [graphicData, setGraphicData] = useState("money");
    const [year, setYear] = useState(new Date().getFullYear());
    const [currentMonth, setCurrentMonth] = useState(null);

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
        <View className="w-full px-3 py-10 gap-10">
            <Text className="text-3xl font-extrabold">Estadísticas del {user.role.role_name}</Text>
            <View horizontal className="bg-white p-5 rounded border border-gray-300 w-full gap-8">
                <View className="flex-row justify-between items-center">
                    <Text className="text-2xl font-bold">Año:</Text>
                    <View className="border border-gray-400 rounded-lg">
                        <Picker style={{ width: 150 }} selectedValue={year} onValueChange={setYear}>
                            <Picker.Item
                                label={new Date().getFullYear()}
                                value={new Date().getFullYear()}
                            />
                            <Picker.Item
                                label={new Date().getFullYear() - 1}
                                value={new Date().getFullYear() - 1}
                            />
                        </Picker>
                    </View>
                </View>
                <View className="flex-row justify-between items-center">
                    <Text className="text-2xl font-bold">Elemento:</Text>
                    <View className="border border-gray-400 rounded-lg">
                        <Picker
                            style={{ width: 150 }}
                            selectedValue={graphicData}
                            onValueChange={setGraphicData}
                        >
                            <Picker.Item label="Dinero" value="money" />
                            <Picker.Item label="Envios" value="sales" />
                        </Picker>
                    </View>
                </View>
                <ScrollView horizontal className="w-full">
                    <Graphic
                        data={yearSales}
                        setCurrentMonth={setCurrentMonth}
                        graphicData={graphicData}
                    />
                </ScrollView>
                <View className="flex-row gap-2">
                    <View className="p-3 border border-gray-400 rounded-lg flex-1">
                        <TruckIcon className="text-center mb-3" size={32} />
                        <Text className="text-xl font-bold text-center">Envios hechos</Text>
                        <Text className="text-4xl font-extrabold text-center">
                            {user.shippings_count}
                        </Text>
                    </View>
                    <View className="p-3 border border-gray-400 rounded-lg flex-1">
                        <SalesIcon className="text-center mb-3" size={32} />
                        <Text className="text-xl font-bold text-center">Dinero hecho</Text>
                        <Text className="text-4xl font-extrabold text-center">
                            {parseInt(user.shippings_money).toLocaleString("es-CO")}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

function Graphic({ data, graphicData }) {
    const chartData = {
        labels: data.map((el) => el.monthToText.charAt(0).toUpperCase() + el.monthToText.slice(1)),
        datasets: [
            {
                label: "Dinero recaudado",
                data: data.map((el) => el.money),
            },
            {
                label: "Número de productos vendidos",
                data: data.map((el) => el.sales),
            },
        ],
    };

    if (graphicData === "sales") chartData.datasets.shift();
    else chartData.datasets.pop();

    return (
        <View className="w-full mr-10">
            <View className="w-full">
                <LineChart
                    data={chartData}
                    width={Dimensions.get("window").width * 1.89}
                    height={220}
                    bezier
                    yAxisLabel={graphicData === "sales" ? "" : "$"}
                    formatYLabel={(value) => parseInt(value).toLocaleString("es-CO")}
                    yAxisInterval={1}
                    chartConfig={{
                        backgroundGradientFrom: "#fff",
                        backgroundGradientTo: "#fff",
                        decimalPlaces: 0,
                        color: () => (graphicData === "sales" ? "red" : "#7C3AED"),
                    }}
                />
            </View>
        </View>
    );
}

export { SellerStats, DeliveryStats, Graphic };
