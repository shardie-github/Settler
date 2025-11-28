/**
 * TransactionTable
 * Displays reconciliation transactions in a table format
 */

import React, { useMemo } from 'react';
import { ReconciliationTransaction } from '@settler/protocol';
import { useCompilationContext } from '../context';
import { useTelemetry } from '../hooks/useTelemetry';
import { sanitizeString } from '@settler/protocol';

export interface TransactionTableProps {
  transactions: ReconciliationTransaction[];
  onSelect?: (transaction: ReconciliationTransaction) => void;
  className?: string;
  showProvider?: boolean;
  showStatus?: boolean;
}

export const TransactionTable = React.memo(function TransactionTable({
  transactions,
  onSelect,
  className,
  showProvider = true,
  showStatus = true
}: TransactionTableProps) {
  const context = useCompilationContext();
  const { track } = useTelemetry('TransactionTable');

  // Memoize sanitized transactions
  const sanitizedTransactions = useMemo(() => {
    return transactions.map(tx => ({
      ...tx,
      id: sanitizeString(tx.id),
      provider: sanitizeString(tx.provider),
      providerTransactionId: sanitizeString(tx.providerTransactionId),
      referenceId: tx.referenceId ? sanitizeString(tx.referenceId) : undefined
    }));
  }, [transactions]);

  // In config mode, register widget
  if (context.mode === 'config') {
    if (!context.config.widgets) {
      context.config.widgets = {};
    }
    context.config.widgets['transaction-table'] = {
      id: 'transaction-table',
      type: 'transaction-table',
      props: {
        showProvider,
        showStatus
      }
    };
  }

  // In UI mode, render table
  if (context.mode === 'ui') {
    return (
      <div className={className} data-widget="transaction-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              {showProvider && <th>Provider</th>}
              <th>Amount</th>
              <th>Currency</th>
              <th>Date</th>
              {showStatus && <th>Status</th>}
            </tr>
          </thead>
          <tbody>
            {sanitizedTransactions.map((tx) => (
              <tr
                key={tx.id}
                onClick={() => {
                  track('transaction.selected', { transactionId: tx.id });
                  onSelect?.(tx);
                }}
                style={{ cursor: onSelect ? 'pointer' : 'default' }}
              >
                <td>{tx.id}</td>
                {showProvider && <td>{tx.provider}</td>}
                <td>{tx.amount.value.toFixed(2)}</td>
                <td>{tx.currency}</td>
                <td>{new Date(tx.date).toLocaleDateString()}</td>
                {showStatus && <td>{tx.status}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // Config mode: return null (widget registered above)
  return null;
});
