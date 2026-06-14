import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const formatDate = (date: any) => {
    return new Date(date).toLocaleDateString("en-IN", {
        weekday: "short",
        day: "numeric",
        month: "short",
    });
};

const OrderStepper = ({
    orderStatus,
    orderDate,
    deliverDate,
}: any) => {

    const steps = [
        {
            name: "Order Placed",
            description: `on ${formatDate(orderDate)}`,
            value: "PLACED",
        },
        {
            name: "Packed",
            description: "Item Packed in Dispatch Warehouse",
            value: "CONFIRMED",
        },
        {
            name: "Shipped",
            description: `by ${formatDate(deliverDate)}`,
            value: "SHIPPED",
        },
        {
            name: "Arriving",
            description: `by ${formatDate(deliverDate)}`,
            value: "ARRIVING",
        },
        {
            name: "Arrived",
            description: `on ${formatDate(deliverDate)}`,
            value: "DELIVERED",
        },
    ];

    const canceledStep = [
        {
            name: "Order Placed",
            description: `on ${formatDate(orderDate)}`,
            value: "PLACED",
        },
        {
            name: "Order Cancelled",
            description: `on ${formatDate(orderDate)}`,
            value: "CANCELLED",
        },
    ];

    // Dynamic current step
    const getCurrentStep = () => {

        switch (orderStatus) {

            case "PLACED":
                return 0;

            case "CONFIRMED":
                return 1;

            case "SHIPPED":
                return 2;

            case "ARRIVING":
                return 3;

            case "DELIVERED":
                return 4;

            case "CANCELLED":
                return 1;

            default:
                return 0;
        }
    };

    const currentStep = getCurrentStep();

    const [statusStep, setStatusStep] = useState(steps);

    useEffect(() => {

        if (orderStatus === "CANCELLED") {

            setStatusStep(canceledStep);

        } else {

            setStatusStep(steps);
        }

    }, [orderStatus]);

    return (
        <Box className="mx-auto my-10">

            {statusStep.map((step, index) => (

                <div key={index} className="flex px-4">

                    <div className="flex flex-col items-center">

                        <Box
                            sx={{ zIndex: -1 }}
                            className={`w-8 h-8 rounded-full flex items-center justify-center z-10

                            ${
                                index <= currentStep
                                    ? "bg-gray-200 text-teal-500"
                                    : "bg-gray-300 text-gray-600"
                            }`}
                        >

                            {step.value === orderStatus ? (
                                <CheckCircleIcon />
                            ) : (
                                <FiberManualRecordIcon sx={{ zIndex: -1 }} />
                            )}

                        </Box>

                        {index < statusStep.length - 1 && (

                            <div
                                className={`border h-20 w-[2px]

                                ${
                                    index < currentStep
                                        ? "bg-teal-500"
                                        : "bg-gray-300"
                                }`}
                            ></div>

                        )}

                    </div>

                    <div className="ml-2 w-full">

                        <div
                            className={`

                            ${
                                step.value === orderStatus
                                    ? "bg-primary-color p-2 text-white font-medium rounded-md -translate-y-3"
                                    : ""
                            }

                            ${
                                orderStatus === "CANCELLED" &&
                                step.value === orderStatus
                                    ? "bg-red-500"
                                    : ""
                            }

                            w-full`}
                        >

                            <p>{step.name}</p>

                            <p
                                className={`text-xs

                                ${
                                    step.value === orderStatus
                                        ? "text-gray-200"
                                        : "text-gray-500"
                                }`}
                            >
                                {step.description}
                            </p>

                        </div>

                    </div>

                </div>

            ))}

        </Box>
    );
};

export default OrderStepper;