import React from 'react'
import { filterStyle, indexStyle } from '../../styles'
import { useGlobalContext } from '../../context/GlobalContextProvider'

const Filter = () => {
  const {brands, categories, filterFields, handleFilterFields} = useGlobalContext()
  return (
    <div className={`${ filterStyle.filter} ${indexStyle.boxContainer}`}>
      <div className={ filterStyle.filterContainer }>
        <span className={ filterStyle.sectionFilter}>Filtros</span>
        <span className={ filterStyle.sectionFilterCategory}>Categoria</span>
        <div>
          {
            categories.map((category) => (
              <div key={category}>
                <button className={ filterStyle.filterToApplied} onClick={() => handleFilterFields(`category-${category}`)}>{category}</button>
              </div>
            ))
          }
        </div>
        <span className={ filterStyle.sectionFilterCategory}>Marca</span>
        <div>
          {
            brands.map((brand) => (
              <div key={brand}>
                <button className={ filterStyle.filterToApplied} onClick={() => handleFilterFields(`brand-${brand}`)}>{brand}</button>
              </div>
            ))
          }
        </div>
      </div>
      <div className={ filterStyle.appliedFilterContainer }>
        <span className={ filterStyle.sectionFilter}>Filtros aplicados</span>
          {
            filterFields.filter(f => f.includes("category")).length ?
            <div>
              <span className={ filterStyle.sectionFilterCategory}>Categoria</span>
              {
                filterFields.filter(f => f.includes("category")).map((filter) =>(
                  <div key={filter}>
                    <button className={ filterStyle.appliedFilter} onClick={() => handleFilterFields(filter)}>{filter.split('-')[1]}</button>
                  </div>
                ))
              }
            </div> : <div></div>
          }
          {
            filterFields.filter(f => f.includes("brand")).length ?
            <div>
            <span className={ filterStyle.sectionFilterCategory}>Marca</span>
            {
              filterFields.filter(f => f.includes("brand")).map((filter) =>(
                <div key={filter}>
                  <button className={ filterStyle.appliedFilter} onClick={() => handleFilterFields(filter)}>{filter.split('-')[1]}</button>
                </div>
              ))
            }
          </div> : <div></div>
          }
      </div>
    </div>
  )
}

export default Filter