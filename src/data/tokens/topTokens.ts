import { NormalizedCacheObject, ApolloClient } from '@apollo/client'
import gql from 'graphql-tag'

export const TOP_TOKENS = gql`
  query topTokens {
    tokens(first: 50, orderBy: totalValueLockedUSD, orderDirection: desc, subgraphError: allow) {
      id
    }
  }
`

interface TopTokensResponse {
  tokens: {
    id: string
  }[]
}

export async function getTopTokenAddresses(dataClient: ApolloClient<NormalizedCacheObject>): Promise<string[]> {
  const { data } = await dataClient.query<TopTokensResponse>({
    query: TOP_TOKENS,
    fetchPolicy: 'cache-first',
  })
  return data ? data.tokens.map((t) => t.id) : []
}
