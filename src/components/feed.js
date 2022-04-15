import React, { useState } from 'react'
import useOrganizationSearch from './useOrganizationSearch'
import useCompanySearch from './useCompanySearch'
import { Col, Button, Row, Table, Form } from 'react-bootstrap'
import { Route } from "react-router-dom";
import useMetadata from './useMetadata'
import usePagination from './usePagination'
import renderRow from '../utils/renderUtils'
import Loading from './loading';

export default function Feed() {
  const [filters, setFilters] = useState({})
  const { sectors, riskTypes, loadingMetadata } = useMetadata()
  const { companies, pagination, loadingCompanyData } = useCompanySearch(filters)
  const { paginator, idx } = usePagination(filters, pagination)
  function handleFilter(event, filterType) {
    let filterName = event.target.id
    setFilters(prevState => {
      if (prevState[filterType] && prevState[filterType][filterName]) {
        return {
          ...prevState,
          [filterType]: {
            ...prevState[filterType], [filterName]: !prevState[filterType][filterName]
          }
        }
      }
      else
        return {
          ...prevState,
          [filterType]: {
            ...prevState[filterType], [filterName]: true
          }
        }
    })
    event.target.blur()
  }
  const cols = [
  'name',
  'tickers',
  'sic_description',
  'regulatory_sentiment',
  'physical_sentiment',
  'opportunity_sentiment',
  ]

  return (
    <span>
      <Row>
        <Col xs={3}>
          <Row><span className='card-title'>Industry Group</span></Row>
          <Row>
            <Form>
              <div key='default-checkbox'>
                {!loadingMetadata && sectors.map(e => { return (<Form.Check style={{ 'fontSize': '15px' }} type='checkbox' id={e} onChange={(e) => { handleFilter(e, 'sector') }} label={e}></Form.Check>) })}
              </div>
            </Form>
          </Row>
          <br />
          <Row><span className='card-title'>Exposure Type</span></Row>
          <Row>
            <Form>
              <div key='default-checkbox'>
                {!loadingMetadata && riskTypes.map(e => { return (<Form.Check style={{ 'fontSize': '15px' }} type='checkbox' id={e} onChange={(e) => { handleFilter(e, 'risk_type') }} label={e}></Form.Check>) })}
              </div>
            </Form>
          </Row>
          <br />
          <Row><span className='card-title'>Risk Sentiment</span></Row>
          <Row>
            <Form>
              <div key='default-checkbox'>
                {!loadingMetadata && ["Low", "Med", "High"].map(e => { return (<Form.Check style={{ 'fontSize': '15px' }} type='checkbox' id={e} onChange={(e) => { handleFilter(e, 'sentiment') }} label={e}></Form.Check>) })}
              </div>
            </Form>
          </Row>
          <br />
          <Row>
            <a href="https://felgueres.gumroad.com/l/climatedisclosuresdataset">
              <Button>Buy Dataset ($25) </Button>
            </a>
          </Row>
        </Col>
        <Col> 
         {loadingCompanyData && <Loading/>}
         {!loadingCompanyData &&
         <div>
          <Table className=''>
            <thead className='card-title'>
              <tr>
                {cols.map(label => <th>{label}</th>)}
              </tr>
            </thead>
            <tbody>
              {!loadingCompanyData && Object.entries(companies).map(([, entry]) => entry).slice(idx.startIdx, idx.endIdx).map(card => (renderRow(card)))}
            </tbody>
          </Table>
          {paginator}
         </div>
         }
        </Col>
      </Row>
    </span>)
}