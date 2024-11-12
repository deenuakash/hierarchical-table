const useTraversal = () => {
    const findItemAndUpdateInput = (items, id, input) => {
      const updatedItems = items.map(item => {
        if (item.id === id) {
          return { ...item, input: Number(input) };
        } else if (item.children) {
          return { ...item, children: findItemAndUpdateInput(item.children, id, input) };
        }
        return item;
      });
      return updatedItems;
    };
  
    const findItemAndUpdateVariance = (items, id) => {
      const updatedItems = items.map(item => {
        if (item.id === id) {
          const newValue = Math.floor(item.value * ((100 + item.input) / 100));
          return { ...item, variance: item.input, value: newValue };
        } else if (item.children) {
          return { ...item, children: findItemAndUpdateVariance(item.children, id) };
        }
        return item;
      });
      return updatedItems;
    };

    const findItemAndUpdateValue = (items, id, value) => {
      const updatedItems = items.map(item => {
        if (item.id === id) {
          return { ...item, value: Number(value) };
        } else if (item.children) {
          return { ...item, children: findItemAndUpdateValue(item.children, id, value) };
        }
        return item;
      });
      return updatedItems;
    };
  
    return { findItemAndUpdateInput, findItemAndUpdateVariance, findItemAndUpdateValue };
  };
  
  export default useTraversal;