﻿using DataAccess.Models;
using DataAccess.TransferModels.Request;
using Service.TransferModels.Responses;

namespace Service.Interfaces;

public interface IPaperService
{
    public PaperDto CreatePaper(CreatePaperDto createPaperDto);
    
    public List<PaperDto> GetAllProducts();
    
    public PaperDto GetPaperById(int paperId);

    public PaperDto UpdateDiscontinuedPaperDto(int id, bool discontinued);

    public PaperDto UpdateRestockPaperDto(int id, int restock);
}