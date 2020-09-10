import React from "react";
import { Heading, Box, Text, Flex } from "rebass";

import { useHistory } from "react-router-dom";

import TransactionsList from "../Transaction/TransacionsList";

import { sortTransactionsByDate } from "../../utils/helpers/sorting";

const StyledBox = ({ children }) => (
  <Box
    sx={{
      flexGrow: "1",
      flexBasis: "200px",
      paddingRight: 5,
    }}
  >
    {children}
  </Box>
);

function AccountDetails({ account }) {
  let history = useHistory();

  const handleEdit = (e) => {
    e.preventDefault();
    history.push(`/accounts/${account.pk}/edit`);
  };

  return (
    <Box mt={3}>
      <Flex flexWrap="wrap" mt={4} width="100%">
        <StyledBox>
          <Box
            sx={{
              padding: 2,
              border: "1px solid",
              borderColor: "backgroundHighlight",
              boxShadow: "2px 4px 0px 0px #49346f",
              transition: "box-shadow 0.2s linear",
              marginBottom: 3,
              ":hover": {
                boxShadow: "9px 8px 0px 0px #49346f",
              },
            }}
          >
            <Heading color="secondary" mb={1}>
              {account.name}
            </Heading>
            <Text fontSize={1} fontWeight="light">
              <Text
                color={account.balance[0] === "-" ? "negative" : "positive"}
                display="inline-block"
              >
                &euro;{account.balance}
              </Text>
              <Text fontFamily="body" display="inline-block">
                &nbsp;-&nbsp;
              </Text>
              <Text fontFamily="body" display="inline-block">
                {account.description}
              </Text>
              <Text
                fontFamily="body"
                mt="-18px"
                display="inline-blow"
                textAlign="right"
                color="gray"
                sx={{
                  ":hover": { textDecoration: "underline", cursor: "pointer" },
                }}
                onClick={(e) => handleEdit(e)}
              >
                Edit account
              </Text>
            </Text>
          </Box>
          <Heading fontSize={3}>Cashflow: ...</Heading>
          <Heading fontSize={3}>Stability: ...</Heading>
        </StyledBox>
        <StyledBox>
          <TransactionsList
            transactions={sortTransactionsByDate(account.expense_set)}
            titleType="expenses"
            accounts={[account, {}]}
          />
        </StyledBox>
        <StyledBox>
          <TransactionsList
            transactions={sortTransactionsByDate(account.income_set)}
            titleType="income"
            accounts={[account, {}]}
          />
        </StyledBox>
      </Flex>
    </Box>
  );
}

export default AccountDetails;
