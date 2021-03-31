import React from 'react'
import { CompradoresList } from '../components/compradores/CompradoresList'

export const CompradoresPage = () => {
    return (
        <CompradoresList
          parametro={false}
          seleccionarComprador={null}
        />
    )
}
