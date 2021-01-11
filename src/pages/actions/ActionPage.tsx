import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Fab,
  makeStyles,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";

import * as actionActions from "../../redux/actions/action";
import { getErrorData, timeout } from "../../utils/helper";
import ActionList from "./components/ActionList";
import ActionForm from "./components/ActionForm";
import ToastMsg from "../../components/ui/ToastMsg";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "absolute",
    zIndex: 1,
    bottom: theme.spacing(3),
    right: theme.spacing(3),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

type DeleteProps = {
  isOpen: boolean;
  loading: boolean;
  onClose: Function;
  onConfirm: Function;
};

const DeleteDialog = ({ isOpen, loading, onClose, onConfirm }: DeleteProps) => {
  return (
    <Dialog open={isOpen} onClose={() => onClose()}>
      <DialogTitle>Delete Action(s)</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure to delete the action(s) selected?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose()} color="secondary" disabled={loading}>
          Cancel
        </Button>
        <Button
          onClick={() => onConfirm()}
          color="primary"
          autoFocus
          disabled={loading}
        >
          {loading ? "Loading" : "OK"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const ActionPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const query = new URLSearchParams(useLocation().search);

  const [formOpen, setFormOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string>(null);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [deleteSelected, setDeleteSelected] = useState<string>(null);
  const [deleteList, setDeleteList] = useState<string[]>([]);

  const [deleteLoading, setDeleteLoading] = useState(false);

  const toggleCheckbox = (actionId: string) => {
    const newDeleteList = [...deleteList];
    const index = newDeleteList.indexOf(actionId);
    if (index === -1) {
      newDeleteList.push(actionId);
    } else {
      newDeleteList.splice(index, 1);
    }
    setDeleteList(newDeleteList);
  };

  const openForm = (actionId: string = null) => {
    if (actionId) setSelectedId(actionId);
    setFormOpen(true);
  };

  const closeForm = () => {
    setSelectedId(null);
    setFormOpen(false);
  };

  const onDeleteConfirm = async () => {
    setDeleteLoading(true);

    const actionIds = deleteSelected ? [deleteSelected] : deleteList;
    const result: any = await dispatch(actionActions.deleteActions(actionIds));
    if (result.error) {
      const body = getErrorData(result.data);
      toast.error(<ToastMsg title={result.message} body={body} />);
    } else {
      if (deleteSelected) {
        setDeleteSelected(null);
        if (deleteList.length && deleteList.includes(deleteSelected)) {
          setDeleteList(deleteList.filter((d) => d !== deleteSelected));
        }
      } else {
        setDeleteList([]);
      }
      toast.success(result);
      await timeout();
      setDeleteDialog(false);
    }
    setDeleteLoading(false);
  };

  useEffect(() => {
    (async () => {
      await dispatch(actionActions.fetchActionList());
      const type = query.get("type");
      const actionId = query.get("actionId");
      type === "form" && openForm(actionId);
    })();
  }, []);

  return (
    <>
      <Box mt={-1} pb={2} display="flex" justifyContent="flex-start">
        <Button
          variant="contained"
          color="secondary"
          disabled={!deleteList.length}
          startIcon={<DeleteIcon />}
          onClick={() => setDeleteDialog(true)}
        >
          Delete Selected
        </Button>
      </Box>
      <ActionList
        deleteList={deleteList}
        toggleCheckbox={toggleCheckbox}
        onEdit={openForm}
        onDelete={(actionId) => {
          setDeleteSelected(actionId);
          setDeleteDialog(true);
        }}
      />
      <ActionForm
        isOpen={formOpen}
        selectedId={selectedId}
        onClose={() => closeForm()}
      />
      <Fab color="secondary" className={classes.fab} onClick={() => openForm()}>
        <AddIcon />
      </Fab>
      <DeleteDialog
        isOpen={deleteDialog}
        loading={deleteLoading}
        onClose={() => setDeleteDialog(false)}
        onConfirm={() => onDeleteConfirm()}
      />
    </>
  );
};

export default ActionPage;
