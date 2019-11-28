import React, { useState, useEffect } from "react";
import Account from "../models/Account";

interface Props {
  battletag?: string;
  id: string;
  onDelete: () => void;
}

const AccountDeleteForm = ({ battletag, id, onDelete }: Props) => {
  const [showForm, setShowForm] = useState(false);
  const account = new Account({ _id: id });

  useEffect(() => {
    async function getHasMatches() {
      const hasMatches = await account.hasMatches();
      if (!hasMatches) {
        setShowForm(true);
      }
    }

    getHasMatches();
  }, [account._id]);

  if (!showForm) {
    return null;
  }

  const deleteAccount = async () => {
    const message = `Are you sure you want to delete ${battletag}?`;

    if (window.confirm(message)) {
      const account = new Account({ _id: id });
      await account.delete()
      onDelete();
    }
  };

  return (
    <form onSubmit={evt => {
      evt.preventDefault();
      deleteAccount();
    }}>
      <button type="submit" className="btn-link text-red text-small">
        Delete account
      </button>
    </form>
  );
};

export default AccountDeleteForm;
