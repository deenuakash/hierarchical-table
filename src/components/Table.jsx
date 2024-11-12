import { useEffect, useRef, useState } from 'react';
import { data as item } from '../utils/data';
import useTraversal from '../hooks/useTraversal';

const Table = () => {

  const {findItemAndUpdateInput, findItemAndUpdateVariance, findItemAndUpdateValue} = useTraversal()

  const [data, setData] = useState(item);

  const handleTraversal = (action,id,input,value) => {
    let newData = [...data]
    if(action === "updateInput")
      newData = findItemAndUpdateInput(data,id,input)
    else if(action === "updatePercentage") {
      newData = findItemAndUpdateVariance(data,id)
    }
    else if(action === "updateValue") {
      newData = findItemAndUpdateValue(data,id,value)
    }

    const updateParentValues = (items) => {
      items.forEach(item => {
        // console.log(item)
        if (item.children) {
            const originalValue = item.value
              item.value = item.children.reduce((sum, child) => sum + child.value, 0);
              let val = ((item.value - originalValue) / originalValue) * 100
              item.variance = val!== 0 ? Number(val).toFixed(2): 0; 
              updateParentValues(item.children);
          }
      });
      return items;
  };
  newData = updateParentValues(newData);
    console.log(newData)
    setData(newData)
    console.log(data)
  }
  return (
    <div>
      <div>
          <span style={{width:'100px',display: 'inline-block'}}>Label</span>
          <span style={{width:'50px',display: 'inline-block'}}>Value</span>
          <span style={{width:'50px',display: 'inline-block'}}>Input</span>
          <span style={{width:'100px',display: 'inline-block'}}>Allocation %</span>
          <span style={{width:'100px',display: 'inline-block'}}>Allocation Val</span>
          <span style={{width:'50px',display: 'inline-block'}}>Variance</span>
      </div>
      {data?.map((item, i) => (
        <SubTable item={item} key={i} handleTraversal={handleTraversal}/>
      ))}
    </div>
  );
};

const SubTable = ({ item, handleTraversal }) => {

  const inputRef = useRef(null)

  const handlePerClick = (item,) => {
    handleTraversal("updatePercentage",item.id,item.input)
  }

  const updateInput = (item) => {
    handleTraversal("updateInput",item.id,Number(inputRef.current.value))
  }

  const handleUpdateValue = (item,value) => {
    console.log(value)
    handleTraversal("updateValue",item.id,null,Number(value))
  }

  return (
    <div>
      
      <div>
        <span style={{width:'100px',display: 'inline-block'}}>{item.label}</span>
        <input style={{width:'50px'}} type="number" value={item.value} onChange={e => handleUpdateValue(item,e.target.value)}/>
        <input ref={inputRef} style={{width:'50px'}} type="number" onChange={() => updateInput(item)}/>
        <button style={{width:'100px'}} onClick={() => handlePerClick(item)}>Allocation %</button>
        <button style={{width:'100px'}}>Allocation Val</button>
        <span style={{width:'50px',display: 'inline-block'}}>{`${item.variance}%`}</span>
      </div>
      {item.children && (
        <div>
          {item.children.map((item, i) => (
            <div key={i} >
              <SubTable item={item} handleTraversal={handleTraversal}/>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}


export default Table;