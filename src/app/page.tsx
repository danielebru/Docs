
'use client'
import {useForm, Controller} from "react-hook-form";
import {z} from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {TextField,Select,MenuItem,FormControl,InputLabel,RadioGroup,Radio,FormControlLabel,Button,InputAdornment,Box
}from "@mui/material";
import { IoSearchOutline, IoChevronDownOutline } from "react-icons/io5";

const documentSchema = z.object({
  searchTerm: z.string().min(1, "Campo obrigatório"),
  certificateType: z.string().min(1, "Selecione um tipo de certificado"),
  signatureType: z.enum(["digital", "fisica"]),
  observations: z.string().optional(),
});

type DocumentSchema = z.infer<typeof documentSchema>;
 
export default function DocumentForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(documentSchema),
    defaultValues: {
      searchTerm: "",
      certificateType: "",
      signatureType: "fisica",
      observations: "",
    },
  });

 const onSubmit = (data: DocumentSchema) => {
  console.log(data);
  alert("PDF gerado com sucesso!");
};

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ maxWidth: "42rem", p: 4 }}
    >
      
      <Box sx={{ mb: 4 }}>
        <h1 className="text-3xl font-bold text-gray-800">
          Emissão de Documentos
        </h1>
        <p className="text-sm text-gray-500">Pesquisar aluno:</p>
      </Box>

  
      <Box sx={{ mb: 3 }}>
        <Controller
          name="searchTerm"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              placeholder="Pesquisar aluno..."
              error={!!errors.searchTerm}
              helperText={errors.searchTerm?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IoSearchOutline size={20} />
                  </InputAdornment>
                ),
              }}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px" } }}
            />
          )}
        />
      </Box>

      <Box sx={{ mb: 3 }}>
        <Controller
          name="certificateType"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth error={!!errors.certificateType}>
              <InputLabel>Tipo de Certificado:</InputLabel>
              <Select
                {...field}
                IconComponent={IoChevronDownOutline}
                label="Tipo de Certificado:"
                sx={{ borderRadius: "8px" }}
              >
                <MenuItem value="">
                  <em>Selecione...</em>
                </MenuItem>
                <MenuItem value="conclusao">Certificado de Conclusão</MenuItem>
                <MenuItem value="matricula">Declaração de Matrícula</MenuItem>
                <MenuItem value="historico">Histórico Escolar</MenuItem>
                <MenuItem value="transferencia">
                  Declaração de Transferência
                </MenuItem>
              </Select>

              {errors.certificateType && (
                <span className="text-xs text-red-600 mt-1 ml-2">
                  {errors.certificateType.message}
                </span>
              )}
            </FormControl>
          )}
        />
      </Box>

      <Box sx={{ mb: 3 }}>
        <Controller
          name="signatureType"
          control={control}
          render={({ field }) => (
            <FormControl>
              <RadioGroup row {...field}>
                <FormControlLabel value="digital" control={<Radio />} label="Digital" />
                <FormControlLabel value="fisica" control={<Radio />} label="Física" />
              </RadioGroup>
            </FormControl>
          )}
        />
      </Box>

      <Box sx={{ mb: 3 }}>
        <Controller
          name="observations"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              multiline
              rows={4}
              label="Observações"
              placeholder="Informações extras..."
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px" } }}
            />
          )}
        />
      </Box>

     <Box sx={{ display: "flex", gap: 2 }}>
        <Button variant="outlined">Baixar PDF</Button>
        <Button variant="contained" sx={{ backgroundColor: "#F97316" }} type="submit">
          Gerar PDF
        </Button>
      </Box>
    </Box>
  );
}
