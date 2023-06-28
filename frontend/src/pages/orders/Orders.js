import React, { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { clearErrors, myOrders } from '../../actions/orderAction';
import Loader from '../../components/loader/Loader';
import { Link } from 'react-router-dom';
import { Launch } from '@mui/icons-material';
import styles from './orders.module.css'


const columns = [
    {
        field: 'id',
        headerName: 'Order Id',
        minWidth: 300,
        flex: 1
    },
    {
        field: 'status',
        headerName: 'Status',
        minWidth: 150,
        flex: 0.5,
        cellClassName: (params) => {
            return params.status === "Delivered"
                ? "greenColor"
                : "redColor";
        },
    },
    {
        field: 'qty',
        headerName: 'Items Quantity',
        minWidth: 300,
        flex: 0.3,
        type: 'number'
    },
    {
        field: 'amount',
        headerName: 'Amount',
        minWidth: 150,
        flex: 0.5,
        type: 'number'
    },
    {
        field: 'actions',
        headerName: 'Actions',
        minWidth: 150,
        flex: 0.3,
        sortable: false,
        type: 'number',
        renderCell: (params) => {
            return (
                <Link to={`/order/${params.id}`}>
                    <Launch />
                </Link>
            );
        },
    },

]



const Orders = () => {
    const dispatch = useDispatch();
    const { error, loading, orders } = useSelector(state => state.myOrders);
    const rows = []
    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        dispatch(myOrders());
    }, [dispatch, error])

    if (loading) {
        return <Loader />
    }

    orders && orders.forEach((ele) => {
        rows.push({
            qty: ele.orderItems.length,
            id: ele._id,
            status: ele.orderStatus,
            amount: ele.totalPrice
        })
    })


    return (
        <div className={styles.parent}>
            <DataGrid
                columns={columns}
                rows={rows}
                autoHeight
                disableRowSelectionOnClick
                pageSize={10}
            />
        </div>

    );
}

export default Orders;
