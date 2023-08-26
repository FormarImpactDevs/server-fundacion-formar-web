const {
  deleteOrder,
  getOrderById,
  getOrderByUser,
  getOrders,
  insertOrder,
  updateOrder,
} = require("../../services/order.service");

module.exports = {
  getOrders: async (req, res) => {
    try {
      const orders = await getOrders();
      const RESPONSE = {
        count: orders.length,
        orders,
      };
      return res.status(200).json(RESPONSE);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  },
  getOrderById: async (req, res) => {
    try {
      const ORDER_ID = req.params.orderId;
      const order = await getOrderById(ORDER_ID);
      return res.status(200).json(order);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  },
  getOrderByUser: async (req, res) => {
    try {
      const { id } = req.user;
      const order = await getOrderByUser(id);

      let response;

      if (order) {
        return res.status(200).json(order);
      } else {
        response = `El usuario ${id} no tiene una orden creada`;
        return res.status(400).json(response);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  },
  addToOrder: async (req, res) => {
    try {
      const { id: user_id } = req.user;
      const order = await getOrderByUser(user_id);

      const { productId, quantity } = req.body;

      if (order) {
        const { id } = order;
        let orderItemData;
        const itemsFromOrder = await getOrderByOrder(id);
        const itemToAdd = itemsFromOrder?.find(
          (item) => item.productId === productId
        );

        if (itemToAdd) {
          orderItemData = {
            productId: itemToAdd.productId,
            orderId: itemToAdd.orderId,
            quantity: itemToAdd.quantity + 1,
          };

          const updateOrderItemFetch = await updateOrderItem(
            orderItemData,
            itemToAdd.id
          );

          return res.status(200).json("Producto modificado");
        } else {
          orderItemData = {
            productId,
            orderId: id,
            quantity: 1,
          };

          const createOrderItemInOrder = await insertOrderItem(orderItemData);

          return res.status(201).json("Producto agregado a la orden " + id);
        }
      } else {
        const data = {
          userId: userId,
          state: "PENDIENTE",
        };

        const createOrder = await insertOrder(data);
        let orderItemData = {
          productId,
          orderId: createOrder.id,
          quantity: 1,
        };

        const createOrderItemInOrder = await insertOrderItem(orderItemData);

        res.status(201).json("Orden creada, e item agregado");
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  },
  removeOneItemFromOrder: async (req, res) => {
    try {
      const { itemId } = req.params;

      const item = await getOrderItemById(itemId);

      if (!item) return res.status(400).json(`El item ${itemId} no existe`);

      if (item.quantity > 1) {
        const updatedItem = {
          ...item,
          quantity: item.quantity - 1,
        };

        const updatedItemResult = await updateOrderItem(updatedItem.itemId);

        return updatedItemResult
          ? res.status(200).json("Item actualizado correctamente")
          : res.status(400).json("Hubo un problema al actualizar el item");
      }

      if (item.quantity === 1) {
        const itemDeleteResult = await deleteOrderItem(itemId);
        const itemsOrder = await getOrderItemsByOrder(item.orderId);

        const orderHaveMoreItems = itemsOrder.length > 0;

        if (!orderHaveMoreItems) {
          const orderDeleteResult = await deleteOrder(item.orderId);

          return itemDeleteResult && orderDeleteResult
            ? res.status(200).json("Item y orden eliminados correctamente")
            : res
                .status(400)
                .json("Hubo un problema al eliminar el item o la orden");
        }
        return itemDeleteResult
          ? res.status(200).json("Item eliminado correctamente")
          : res.status(400).json("Hubo un problema al eliminar el item");
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  },
  removeAllFromOrder: async (req, res) => {
    try {
        const { itemId } = req.params;
        const item = await getOrderItemById(itemId);
        if (!item) return res.status(400).json(`El item ${itemId} no existe`);
        const itemsOrder = await getOrderItemsByOrder(item.orderId);
        const orderHaveMoreOfOneItem = itemsOrder.length > 1;
        const itemDeleteResult = await deleteOrderItem(itemId);

        if (orderHaveMoreOfOneItem) {
            return itemDeleteResult
                ? res.status(200).json("Item eliminado correctamente")
                : res.status(400).json("Hubo un problema al querer eliminar el item");
        } else {
            const orderDeleteResult = await deleteOrder(item.orderId);
            return itemDeleteResult && orderDeleteResult 
                ? res.status(200).json("Item y orden eliminados correctamente")
                : res
                    .status(400)
                    .json("Hubo un problema al querer eliminar el item o la orden");
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
  },
  clearOrder: async (req, res) => {
    try {
        const { orderId } = req.params;
        const itemsDeleteResult = await bulkDeleteOrderItems(orderId);
        const orderDeleteResult = await deleteOrder(orderId);

        return itemsDeleteResult && orderDeleteResult
            ? res.status(200).json("Orden eliminada correctamente")
            : res.status(400).json("Hubo un error al eliminar la orden");
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
  },
};
