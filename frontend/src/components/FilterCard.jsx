import React, { useEffect, useState, useRef } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'

const filterData = [
    {
        filterType: "Location",
        array: ["Delhi NCR", "Bengaluru", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        filterType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer","Data Science"]
    },
    {
        filterType: "Salary",
        array: ["1-5", "5-10", "10-15","15-50"]
    },
]

const FilterCard = () => {
    const searchedQuery = useSelector((store) => store.job.searchedQuery);
    const [filters, setFilters] = useState({
        keyword: '',
        Location: '',
        Industry: '',
        Salary: ''
    });
    const dispatch = useDispatch();

    const changeHandler = (value, filterType) => {
        setFilters(prev => ({
            ...prev,
            [filterType]: value
        }));
    }

    const didMount = useRef(false);

    useEffect(() => {
        if (
            searchedQuery &&
            typeof searchedQuery === 'object' &&
            JSON.stringify(searchedQuery) !== JSON.stringify(filters)
        ) {
            setFilters({
                keyword: searchedQuery.keyword || '',
                Location: searchedQuery.Location || '',
                Industry: searchedQuery.Industry || '',
                Salary: searchedQuery.Salary || ''
            });
        }
    }, [searchedQuery]);

    useEffect(() => {
        if (didMount.current) {
            if (
                typeof searchedQuery === 'object' &&
                JSON.stringify(searchedQuery) !== JSON.stringify(filters)
            ) {
                dispatch(setSearchedQuery(filters));
            }
        } else {
            didMount.current = true;
        }
    }, [filters]);

    return (
        <div className='w-full bg-white p-3 rounded-md'>
            <h1 className='font-bold text-lg'>Filter Jobs</h1>
            <hr className='mt-3' />
            <div className="mb-4">
                <input
                    type="text"
                    value={filters.keyword}
                    onChange={e => changeHandler(e.target.value, 'keyword')}
                    placeholder="Search by keyword (title, description, location)"
                    className="w-full border rounded px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-[#6A38C2]"
                />
            </div>
            {filterData.map((data, index) => (
                <div key={data.filterType} className="mb-4">
                    <h1 className='font-bold text-lg'>{data.filterType}</h1>
                    <RadioGroup
                        value={filters[data.filterType]}
                        onValueChange={(value) => changeHandler(value, data.filterType)}
                    >
                        {/* None option */}
                        <div className='flex items-center space-x-2 my-2'>
                            <RadioGroupItem value="" id={`${data.filterType}-none`} />
                            <Label htmlFor={`${data.filterType}-none`}>None</Label>
                        </div>
                        {data.array.map((item, idx) => {
                            const itemId = `${data.filterType}-${idx}`;
                            return (
                                <div key={itemId} className='flex items-center space-x-2 my-2'>
                                    <RadioGroupItem value={item} id={itemId} />
                                    <Label htmlFor={itemId}>{item}</Label>
                                </div>
                            );
                        })}
                    </RadioGroup>
                </div>
            ))}
        </div>
    )
}

export default FilterCard