import React, { useState, useEffect, useRef } from 'react'
import compare from './Functions/compareFn'
import LoadingScreen from './LoadingScreen'

function Table() {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([]) // initial fetched data
    const [dataChange, setDataChange] = useState([])
    const [reRender, setReRender] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")

    const searchInput = useRef("")

    useEffect(() => {
        async function fetchData() {
            const response = await fetch("https://covid19.ddc.moph.go.th/api/Cases/round-3-line-lists#")
            let resData = await response.json()
            setData(resData.data.slice(0, 100))
            setDataChange(resData.data.slice(0, 100))
            setLoading(true)
            //set only first 100 records
        }
        fetchData()
    }, [])


    function sortBy(direction, type) {
        const sorted = dataChange.sort(compare(direction, type))
        setDataChange(sorted)
        //useState doesn't detect change from sort() -> no DOM rerender 
        //need to force rerender by another useState
        setReRender(!reRender)
    }

    let tableHeader = [
        { title: "Date", name: "txn_date" },
        { title: "Gender", name: "gender" },
        { title: "Age Number", name: "age_number" },
        { title: "Age Range", name: "age_range" },
        { title: "Nationality", name: "nationality" },
        { title: "Job", name: "job" },
        { title: "Risk", name: "risk" },
        { title: "Patient Type", name: "patient_type" },
        { title: "Province", name: "province" },
        { title: "Last Update", name: "update_date" }
    ]

    function handleSearch() {
        setSearchTerm(searchInput.current.value)
        if (searchInput.current.value !== "") {
            const newData = data.filter((item) => {
                return Object.values(item).join(" ").toLowerCase().includes(searchInput.current.value.toLowerCase())
            })
            setDataChange(newData)
        }
        else {
            setDataChange(data)
        }
    }


    return (
        <>
            <div className="search-container">
                <span>🔍</span>
                <input type="text" placeholder='Search...' ref={searchInput} onChange={handleSearch} />
            </div>
            <table>
                <tr>
                    {tableHeader.map(item => (
                        <th className="table__header">
                            <p>{item.title}</p>
                            <div className="btn-container">
                                <button onClick={() => sortBy("decending", item.name)}>▲</button>
                                <button onClick={() => sortBy("ascending", item.name)}>▼</button>
                            </div>
                        </th>
                    ))}
                </tr>
                {/* {loading ? dataChange : <LoadingScreen/>} */}
                {loading ? dataChange.map((item, index) => (
                    <tr key={index}>
                        <th>{item.txn_date}</th>
                        <th>{item.gender}</th>
                        <th>{item.age_number}</th>
                        <th>{item.age_range}</th>
                        <th>{item.nationality}</th>
                        <th>{item.job}</th>
                        <th>{item.risk}</th>
                        <th>{item.patient_type}</th>
                        <th>{item.province}</th>
                        <th>{item.update_date}</th>
                    </tr>
                )):<LoadingScreen/>}
            </table>
        </>)
}
export default Table 