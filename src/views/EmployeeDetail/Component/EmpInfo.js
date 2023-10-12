import React from 'react'

const EmpInfo = ({data}) => {
  console.log(data)
  return (
    <div>EmpInfo {data?.name_en}</div>
  )
}

export default EmpInfo