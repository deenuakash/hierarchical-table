export const data = [
  {
    "id": "electronics",
    "label": "Electronics",
    "value": 1500, //this value needs to be calculated from the children values (800+700)
    "input": 0,
    "variance": 0,
    "children": [
      {
        "id": "phones",
        "label": "Phones",
        "value": 800,
        "input": 0,
        "variance": 0,
      },
      {
        "id": "laptops",
        "label": "Laptops",
        "value": 700,
        "input": 0,
        "variance": 0,
      }
    ]
  },
  {
    "id": "furniture",
    "label": "Furniture",
    "value": 1000, //this need to be calculated from the children values (300+700)
    "input": 0,
    "variance": 0,
    "children": [
      {
        "id": "tables",
        "label": "Tables",
        "value": 300,
        "input": 0,
        "variance": 0,
      },
      {
        "id": "chairs",
        "label": "Chairs",
        "value": 700,
        "input": 0,
        "variance": 0,
      }
    ]
  }
]