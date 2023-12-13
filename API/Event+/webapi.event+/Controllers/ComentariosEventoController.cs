using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.CognitiveServices.ContentModerator;
using System.Text;
using webapi.event_.Domains;
using webapi.event_.Repositories;

namespace webapi.event_.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ComentariosEventoController : ControllerBase
    {
        // Acesso aos métodos do repositório
        ComentariosEventoRepository comentarios = new ComentariosEventoRepository();

        // Armazena dados da API externa (IA - Azure)
        private readonly ContentModeratorClient _contentModeratorClient;

        /// <summary>
        /// Construtor que recebe os dados necessários para o acesso ao serviço externo
        /// </summary>
        /// <param name="contentMod">Objeto do tipo ContentModeratorClient</param>
        public ComentariosEventoController(ContentModeratorClient contentMod)
        {
            _contentModeratorClient = contentMod;
        }

        [HttpPost("CadastroModerado")]
        public async Task<IActionResult> PostModerated(ComentariosEvento newComment){
            try
            {
                // Se a descrição do comentário não for passado no objeto
                if (string.IsNullOrEmpty(newComment.Descricao))
                {
                    return BadRequest("O comentário a ser moderado não pode ser vazio!");
                }

                // Converte o conteúdo do comentário em um MemoryStream
                using var stream = new MemoryStream(Encoding.UTF8.GetBytes(newComment.Descricao));

                // Realiza a moderação do conteúdo
                var moderationResult = await _contentModeratorClient.TextModeration
                    .ScreenTextAsync("text/plain", stream, "por", false, false, null, true);
                // Se existirem termos ofensivos, alterne Exibe para false
                if (moderationResult.Terms != null)
                {
                    newComment.Exibe = false;
                }
                comentarios.Cadastrar(newComment);
                return StatusCode(201, newComment);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(comentarios.Listar());
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpGet("ListarModerado")]
        public IActionResult GetModerated()
        {
            try
            {
                return Ok(comentarios.ListarModerado());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("BuscarPorIdUsuario")]
        public IActionResult GetByUserId(Guid IdUsuario, Guid IdEvento)
        {
            try
            {
                return Ok(comentarios.BuscarPorId(IdUsuario, IdEvento));
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public IActionResult Post(ComentariosEvento novoComentario)
        {
            try
            {
                comentarios.Cadastrar(novoComentario);
                return Ok(novoComentario);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(Guid id)
        {
            try
            {
                comentarios.Deletar(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }
    }
}
