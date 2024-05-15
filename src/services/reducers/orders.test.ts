import {
  setWebsocketOpen,
  setWebsocketClose,
  setWebsocketConnection,
  setWebsocketOffline,
  setWebsocketConnectionError,
  setWebsocketGetOrders,
  onFetchOrderPending,
  onFetchOrderFulfilled,
  onFetchOrderRejected,
  ordersReducer
} from './orders';
import { orders, order } from '../tests/index'

jest.mock("../../utils/timestamp", () => ({
  ...jest.requireActual("../../utils/timestamp"),
  getCurrentTimestamp: () => 123,
}));

describe("orders reducer", () => {
  it("unknown action should return the initial state", () => {
    const result = ordersReducer(undefined, { type: "" });

    expect(result).toEqual({
      wsOpen: false,
      wsUrl: '',
      wsConnectionStatus: true,
      wsError: null,
      orders: null,
      fetchError: null,
      fetchRequest: false,
      order: null,
    });
  });

  it("should handle setWebsocketClose", () => {
    const result = ordersReducer(
      {
        wsOpen: true,
        wsUrl: '',
        wsConnectionStatus: true,
        wsError: null,
        orders: null,
        fetchError: null,
        fetchRequest: false,
        order: null,
      },
      setWebsocketClose(true)
    );

    expect(result).toEqual({
      wsOpen: false,
      wsUrl: '',
      wsConnectionStatus: true,
      wsError: null,
      orders: null,
      fetchError: null,
      fetchRequest: false,
      order: null,
    });
  });

  it("should handle setWebsocketOpen", () => {
    const result = ordersReducer(
      {
        wsOpen: false,
        wsUrl: '',
        wsConnectionStatus: true,
        wsError: null,
        orders: null,
        fetchError: null,
        fetchRequest: false,
        order: null,
      },
      setWebsocketOpen(true)
    );

    expect(result).toEqual({
      wsOpen: true,
      wsUrl: '',
      wsConnectionStatus: true,
      wsError: null,
      orders: null,
      fetchError: null,
      fetchRequest: false,
      order: null,
    });
  });

  it("should handle setWebsocketConnection", () => {
    const result = ordersReducer(
      {
        wsOpen: false,
        wsUrl: '',
        wsConnectionStatus: true,
        wsError: null,
        orders: null,
        fetchError: null,
        fetchRequest: false,
        order: null,
      },
      setWebsocketConnection('1')
    );

    expect(result).toEqual({
      wsOpen: false,
      wsUrl: '1',
      wsConnectionStatus: true,
      wsError: null,
      orders: null,
      fetchError: null,
      fetchRequest: false,
      order: null,
    });
  });

  it("should handle setWebsocketOffline", () => {
    const result = ordersReducer(
      {
        wsOpen: false,
        wsUrl: '',
        wsConnectionStatus: true,
        wsError: null,
        orders: null,
        fetchError: null,
        fetchRequest: false,
        order: null,
      },
      setWebsocketOffline()
    );

    expect(result).toEqual({
      wsOpen: false,
      wsUrl: '',
      wsConnectionStatus: false,
      wsError: null,
      orders: null,
      fetchError: null,
      fetchRequest: false,
      order: null,
    });
  });


  it("should handle setWebsocketConnectionError", () => {
    const result = ordersReducer(
      {
        wsOpen: false,
        wsUrl: '',
        wsConnectionStatus: true,
        wsError: null,
        orders: null,
        fetchError: null,
        fetchRequest: false,
        order: null,
      },
      setWebsocketConnectionError('2')
    );

    expect(result).toEqual({
      wsOpen: false,
      wsUrl: '',
      wsConnectionStatus: true,
      wsError: '2',
      orders: null,
      fetchError: null,
      fetchRequest: false,
      order: null,
    });
  });

  it("should handle setWebsocketGetOrders", () => {
    const result = ordersReducer(
      {
        wsOpen: false,
        wsUrl: '',
        wsConnectionStatus: true,
        wsError: null,
        orders: null,
        fetchError: null,
        fetchRequest: false,
        order: null,
      },
      setWebsocketGetOrders(orders)
    );

    expect(result).toEqual({
      wsOpen: false,
      wsUrl: '',
      wsConnectionStatus: true,
      wsError: null,
      orders: orders,
      fetchError: null,
      fetchRequest: false,
      order: null,
    });
  });

  it("should handle onFetchOrderPending", () => {
    const result = ordersReducer(
      {
        wsOpen: false,
        wsUrl: '',
        wsConnectionStatus: true,
        wsError: null,
        orders: null,
        fetchError: null,
        fetchRequest: false,
        order: null,
      },
      onFetchOrderPending()
    );

    expect(result).toEqual({
      wsOpen: false,
      wsUrl: '',
      wsConnectionStatus: true,
      wsError: null,
      orders: null,
      fetchError: null,
      fetchRequest: true,
      order: null,
    });
  });

  it("should handle onFetchOrderFulfilled", () => {
    const result = ordersReducer(
      {
        wsOpen: false,
        wsUrl: '',
        wsConnectionStatus: true,
        wsError: null,
        orders: null,
        fetchError: null,
        fetchRequest: false,
        order: null,
      },
      onFetchOrderFulfilled(order)
    );

    expect(result).toEqual({
      wsOpen: false,
      wsUrl: '',
      wsConnectionStatus: true,
      wsError: null,
      orders: null,
      fetchError: null,
      fetchRequest: false,
      order: order,
    });
  });

  it("should handle onFetchOrderRejected", () => {
    const result = ordersReducer(
      {
        wsOpen: false,
        wsUrl: '',
        wsConnectionStatus: true,
        wsError: null,
        orders: null,
        fetchError: null,
        fetchRequest: false,
        order: null,
      },
      onFetchOrderRejected('some error')
    );

    expect(result).toEqual({
      wsOpen: false,
      wsUrl: '',
      wsConnectionStatus: true,
      wsError: null,
      orders: null,
      fetchError: 'some error',
      fetchRequest: false,
      order: null,
    });
  });

});